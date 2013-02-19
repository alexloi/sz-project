var masterKey = "";


// init
$(window).load(function(){
  $("#masterModal").reveal({
    closeOnBackgroundClick: false,
    closeOnEsc: false
  });

  $("#closeMasterModal").on('click', function(e){
    $("#masterModal").trigger('reveal:close');
    masterKey = $("#masterKey").val();
    preloader('on');
    initData();
  });

});

// Scroll behaviour
$(window).scroll(function(e){ 
  if(parseInt($(window).width()) > 300) { 
    $el = $('#profile-board'); 
    if ($(this).scrollTop() > 150 && $el.css('position') != 'fixed'){ 
      $el.width($el.width());
      $el.css({'position': 'fixed', 'top': '0px'});
    }

    if ($(this).scrollTop() < 140 && $el.css('position') == 'fixed'){ 
      $el.css({'position': 'relative', 'top': 'auto'}); 
    }
  }

});

$(document).ready(function(){
  uiBinds();
});


function initData(){
  // Bother to load data only if its not his first run!
  if(!userObj.first){
    pullDataObj('startScene');
  }else{
    displayStartingScene();
  }
}

function uiBinds(){
  $('#view').on('click', function(e){
    $('dl>dd').each(function(){
      $(this).removeClass('active');
    });
    $(this).parent('dd').addClass('active');
    $('#newTab').hide();
    displayViewScene();
    $('#viewTab').show();
  });

  $('#new').on('click', function(e){
    $('#newTab').find('input').each(function(){$(this).val(" ")});
    $('dl>dd').each(function(){
      $(this).removeClass('active');
    })
    $(this).parent('dd').addClass('active');
    $('#viewTab').hide();
    $('#newTab').show();
  });

  $('#btn-add-profile').on('click', function(e){
    $('#new').trigger('click');
  });

  $('#pushData').on('click',function(e){
    e.preventDefault();
    console.log('click', masterKey);
    pushDataObj();
  });

  $('#pullData').on('click',function(e){
    e.preventDefault();
    console.log('pull click', masterKey);
    pullDataObj();
  });
}

function displayStartingScene(){
  $("#tabs").show();

  if(userObj.first){
    displayNewScene();
  }else{
    displayViewScene();
  }

  preloader('off');
}

function displayNewScene(){
  $("#new").parent().addClass('active');
  $("#newTab").show();
}

function displayViewScene(){
  $("#view").parent('dd').addClass('active');
    if(dataObj.profiles){
      // Load profile list
      $('#profile-list').html('');
      
      $.each(dataObj.profiles, function(i, profile){
        if(i==0) $('#profile-list').append('<dd class="active"><a href="#" class="profile-btn" tag="'+i+'">'+profile.profile_name+'</a></dd');
        else $('#profile-list').append('<dd><a href="#" class="profile-btn" tag="'+i+'">'+profile.profile_name+'</a></dd');
        console.log(i, profile);
      });

      // Click handler
      $('.profile-btn').on('click', function(e){
        e.preventDefault();
        loadProfile(parseInt($(this).attr('tag')));
      });

      // Load profile
      loadProfile(0);
    }

  $("#viewTab").show();

  return;
}

function loadProfile(count){
  var profile = dataObj.profiles[count];

  $.ajax({
    url:'/dashboard/profile',
    type: 'POST',
    data:{
      _csrf: $("#csrf").val(),
      profile: profile
    },
    success: function(html){
      console.log("GOT HTML BACK:", html);
      $("#profile-tmpl").html(html);
    },
    error: function(error){
      console.log("POUTSO EN DOULEFKI TO LOAD PROFILE", error);
      $("#profile_tmpl").html("Service currently unavailable");
    }
  });
}


function pullDataObj(event){
  // Get data obj form database
  $.ajax({
      url: '/data/retrieve',
      type: 'POST',
      data: {
        master: masterKey,
        _csrf: $("#csrf").val()
      },
      success: function(data) {
        console.log("GOT DATA BACK:", data, event);
        dataObj = $.parseJSON(data.obj);
        if(event){
          switch(event){
            case 'startScene':
              displayStartingScene();
            break;

            default:
            break;
          }
        }
        return true;
      },
      error: function(error){
        if(event){
          switch(event){
            case 'startScene':
              displayStartingScene();
            break;

            default:
            break;
          }
        }
      }
    });
}

function pushDataObj(){
  // Push formObj in dataObj and ajax post
  var form = $("#new_profile").serializeObject();
  dataObj.profiles.push(form);

  $.ajax({
      url: '/data/store',
      type: 'post',
      async: false,
      data: {
        master: masterKey,
        data: dataObj,
        _csrf: $("#csrf").val()
      },
      success: function(data) {
        console.log("PUSH DATA SUCCESS:", data);
        $('#view').trigger('click');
      },
      error: function(error){
        console.log("PUSH DATA ERROR",error);
      }
    });
}

function preloader(action){
  switch(action){
    case 'on':
      console.log('turned on!');
      $('#preloader').show();
    break;

    case 'off':
      console.log('turned off!');
      $('#preloader').hide();
    break;

    default:
      console.log('Preloader is fucked.');
    break;
  }
}