// Call our functions when the page is ready.
$(document).ready(function() {
  // Defines our variables
  var enabled = false,
    cbody = $('.body'),
    canves = $('.canves'),
    drawable = false,
    drawing  = false,
    mS = {}, // mouse start 
    dBox;
  
  // Hide onload
  $(".hair, #mousepos, .filemenu, .library-sec").hide();
    
  // Code Mirroring
  $(function() {
    $('.mirror-title').text($('.website-title').val());
    
    $('.website-title').keyup(function() {
      $('.mirror-title').text($(this).val());
      $('#code').val($('.mirror-code').text());
    });
    
    $('#code').val($('.mirror-code').text());
  });

  
  // Tools & Tabs
  $(function() {
    // Tabs
    $(function() {
      // Inspector
      $('.inspector').click(function() {
        $(this).removeClass('tab-normal');
        $(this).addClass('tab-active');
        $('.library').removeClass('tab-active');
        $('.library').addClass('tab-normal');
        $(".inspection").show();
        $(".library-sec, .filemenu").hide();
        $(".menu").removeClass('menu-active');
      });
      
      // Library
      $('.library').click(function() {
        $(this).removeClass('tab-normal');
        $(this).addClass('tab-active');
        $('.inspector').removeClass('tab-active');
        $('.inspector').addClass('tab-normal');
        $(".library-sec, .library-sec *").show();
        $(".inspection, .filemenu").hide();
        $(".menu").removeClass('menu-active');
      });
      
      // Toggles Property Containers
      $(".drop").click(function() {
        $(this).toggleClass('title-active');
        if ($(this).hasClass('title-active')) {
          $(this).css('color', '#666');
          $(this).next().hide();
        } else {
          $(this).css('color', '#999');
          $(this).next().show();
         }
      });
    });
    
    // Tools
    $(function() {
      // Select Tool
      $('.select-tool').click(function() {
        $(".inspector").trigger('click');
        $(this).toggleClass('select-active');
        if ($('.select-active').is(':visible')) {
          $('.dialogs').val('select-properties').trigger('change');
          
          // If other tools are visible hide them
          if ($('.div-active, .edit-active, .remove-active, .table-active,  .menu-active').is(':visible')) {
            $('.div-active, .edit-active, .remove-active, .table-active,  .menu-active').trigger('click');
          }
                    
          // Mouse & Touch Event Handlers
          $('.canves *').on('mousedown touchstart', function() {
            // First we must detect our selection
            $('.find-elm-name').text(this.nodeName.toLowerCase());
            $('.findclassname').val($(this).attr('class'));
            $('.grab-postop').val($(this).css('top'));
            $('.grab-posleft').val($(this).css('left'));
            $('.grab-posbottom').val($(this).css('bottom'));
            $('.grab-posright').val($(this).css('right'));
            $('.grab-width').val($(this).css('width'));
            $('.grab-height').val($(this).css('height'));
            $('.grab-bg').val($(this).css('background-color'));
            $('.grab-border-size').val($(this).css('border-width'));
            $('.grab-border-style').val($(this).css('border-style'));
            $('.grab-border-color').val($(this).css('border-color'));
            $('.grab-font-size').val($(this).css('font-size'));
            $('.grab-font-family').val($(this).css('font-family').toLowerCase());
            $('.grab-font-color').val($(this).css('color'));
            $('.grab-line-height').val($(this).css('line-height'));
            $('.grab-letter-spacing').val($(this).css('letter-spacing'));
            $('.grab-word-spacing').val($(this).css('word-spacing'));
            $('.grab-text-transform').val($(this).css('text-transform'));
            $('.grab-text-align').val($(this).css('text-align'));
            $('.grab-word-wrap').val($(this).css('word-wrap'));
            $('.grab-white-space').val($(this).css('white-space'));
            $('.grab-display').val($(this).css('display'));
            $('.grab-padding').val($(this).css('padding'));
            $('.grab-margin').val($(this).css('margin'));
            $('.grab-overflow').val($(this).css('overflow'));
            $('.grab-transition').val($(this).css('transition'));
            $('.grab-transform').val($(this).css('transform'));
            $('.grab-filter').val($(this).css('filter'));
            $('.select-properties input[type=checkbox]').prop('checked', 'checked');
            $('.check-inputs').find('input[type=text]').prop('enabled', true);
            $('.check-inputs').find('input[type=text]').prop('disabled', false);
            
            // Detect FontFamily
            var fontFamily = $(this).css('font-family').toLowerCase().replace(/ /g, '-');
            $('.grab-' + fontFamily).trigger('click');
            $('.setmy-typography a').css('backgroundColor', '#444');
            $('.grab-' + fontFamily).css('backgroundColor', '#1c1c1c');
            
            // Detect BorderStyle
            var borderStyle = $(this).css('border-style').toLowerCase().replace(/ /g, '-');
            $('.set-' + borderStyle).trigger('click');
            $('.set-borders a').css('backgroundColor', '#444');
            $('.set-' + borderStyle).css('backgroundColor', '#1c1c1c');
            
          });
          
          $('.grab-pos-static').css('backgroundColor', '#444');
          $('.grab-pos-relative').css('backgroundColor', '#444');
          $('.grab-pos-absolute').css('backgroundColor', '#444');
          $('.grab-pos-fixed').css('backgroundColor', '#444');
          
          // If moduals are checked enable texboxs if unchecked disable textboxs
          $('.check-inputs').find('input[type=text]').prop('disabled', true);
          
          $('#lpos').on('change', function() {
            $('.grab-elm-pos').find('input[type=text]')
            .prop('disabled', !this.checked)
            .val(this.checked ? "" : "");
          });
          $('#lsize').on('change', function() {
            $('.grab-elm-size').find('input[type=text]')
            .prop('disabled', !this.checked)
            .val(this.checked ? "" : "");
          });
          $('#lbg').on('change', function() {
            $('.grab-elm-bg').find('input[type=text]')
            .prop('disabled', !this.checked)
            .val(this.checked ? "" : "");
          });
          $('#lborder').on('change', function() {
            $('.grab-elm-border').find('input[type=text]')
            .prop('disabled', !this.checked)
            .val(this.checked ? "" : "");
          });
          $('#ltypography').on('change', function() {
            $('.grab-elm-typography').find('input[type=text]')
            .prop('disabled', !this.checked)
            .val(this.checked ? "" : "");
          });
          $('#ladvanced').on('change', function() {
            $('.grab-elm-advanced-opt').find('input[type=text]')
            .prop('disabled', !this.checked)
            .val(this.checked ? "" : "");
          });
          
          // Detect/Set selected elements font family
          $('.grabmy-typography a').click(function() {
            $("." + $('.findclassname').val()).css({
              'font-family': $(this).text()
            });
            $('.grabmy-typography a').css('backgroundColor', '#444');
            $(this).css('backgroundColor', '#1c1c1c');
            $('.grab-font-family').val($(this).text());
          });
          
          // Detect/Set selected elements position
          if ($(this).css('position') === 'static') {
            $('.grab-pos-static').css('backgroundColor', '#1c1c1c');
            $('.grab-pos-relative').css('backgroundColor', '#444');
            $('.grab-pos-absolute').css('backgroundColor', '#444');
            $('.grab-pos-fixed').css('backgroundColor', '#444');
          }
          
          if ($(this).css('position') === 'relative') {
            $('.grab-pos-static').css('backgroundColor', '#444');
            $('.grab-pos-relative').css('backgroundColor', '#1c1c1c');
            $('.grab-pos-absolute').css('backgroundColor', '#444');
            $('.grab-pos-fixed').css('backgroundColor', '#444');
          }
          
          if ($(this).css('position') === 'absolute') {
            $('.grab-pos-static').css('backgroundColor', '#444');
            $('.grab-pos-relative').css('backgroundColor', '#444');
            $('.grab-pos-absolute').css('backgroundColor', '#1c1c1c');
            $('.grab-pos-fixed').css('backgroundColor', '#444');
          }
          
          if ($(this).css('position') === 'fixed') {
            $('.grab-pos-static').css('backgroundColor', '#444');
            $('.grab-pos-relative').css('backgroundColor', '#444');
            $('.grab-pos-absolute').css('backgroundColor', '#444');
            $('.grab-pos-fixed').css('backgroundColor', '#1c1c1c');
          }
          
          // Set position
          $('.grab-elm-pos a').click(function() {
            $("." + $('.findclassname').val()).css({
              'position': $(this).attr('title')
            });
            $('.grab-elm-pos a').css('backgroundColor', '#444');
            $(this).css('backgroundColor', '#1c1c1c');
            $('.grab-pos-val').val($(this).attr('title'));
          });
          
          $('.grab-postop').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'top': $(this).val()
            });
          });
          
          $('.grab-posleft').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'left': $(this).val()
            });
          });
          
          $('.grab-posbottom').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'bottom': $(this).val()
            });
          });
          
          $('.grab-posright').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'right': $(this).val()
            });
          });
          
          // Set width & height
          $('.grab-width').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'width': $(this).val()
            });
          });
          
          $('.grab-height').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'height': $(this).val()
            });
          });
          
          // Set Background Color
          $('.set-bg').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'background-color': $(this).val()
            });
          });
          
          // Set border
          $('.grab-none, .grab-solid, .grab-dotted, .grab-dashed, .grab-double, .grab-ridge, .grab-groove, .grab-inset, .grab-outset').on('click', function() {
            $('.grab-border-style').val($(this).attr('title'))
            $("." + $('.findclassname').val()).css({
              'border-style': $('.grab-border-style').val()
            });
          });
          
          $('.grab-border-size').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'border-width': $(this).val()
            });
          });
          
          $('.grab-border-color').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'border-color': $(this).val()
            });
          });
          
          // Set font family
          $('.grab-typography a').each(function(){
            $(this).css('font-family', $(this).text());
          });
          
          $('.grab-font-size').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'font-size': $(this).val()
            });
          });
          
          $('.grab-font-family').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'font-family': $(this).val()
            });
          });
          
          $('.grab-font-color').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'color': $(this).val()
            });
          });
          
          $('.enable-line-height').on('change', function() {
            $('.grab-line-height').prop('disabled', !this.checked)
                                  .val(this.checked ? "" : "");
          });
          
          $('.grab-line-height').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'line-height': $(this).val()
            });
          });
          
          $('.enable-letter-spacing').on('change', function() {
            $('.grab-letter-spacing').prop('disabled', !this.checked)
                                     .val(this.checked ? "" : "");
          });
          
          $('.grab-letter-spacing').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'letter-spacing': $(this).val()
            });
          });
          
          $('.enable-word-spacing').on('change', function() {
            $('.grab-word-spacing').prop('disabled', !this.checked)
                                   .val(this.checked ? "" : "");
          });
          
          $('.grab-word-spacing').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'word-spacing': $(this).val()
            });
          });
          
          $('.enable-text-transform').on('change', function() {
            $('.grab-text-transform').prop('disabled', !this.checked)
                                     .val(this.checked ? "" : "");
          });
          
          $('.grab-text-transform').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'text-transform': $(this).val()
            });
          });
          
          $('.enable-text-align').on('change', function() {
            $('.grab-text-align').prop('disabled', !this.checked)
                                 .val(this.checked ? "" : "");
          });
          
          $('.grab-text-align').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'text-align': $(this).val()
            });
          });
          
          $('.enable-word-wrap').on('change', function() {
            $('.grab-word-wrap').prop('disabled', !this.checked)
                                .val(this.checked ? "" : "");
          });
          
          $('.grab-word-wrap').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'word-wrap': $(this).val()
            });
          });
          
          $('.enable-white-space').on('change', function() {
            $('.grab-white-space').prop('disabled', !this.checked)
                              .val(this.checked ? "" : "");
          });
          
          $('.grab-white-space').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'white-space': $(this).val()
            });
          });
          
          // Setup Advanced Section
          $('.enable-display').on('change', function() {
            $('.grab-display').prop('disabled', !this.checked)
                              .val(this.checked ? "" : "");
          });

          $('.grab-display').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'display': $(this).val()
            });
          });
          
          $('.enable-padding').on('change', function() {
            $('.grab-padding').prop('disabled', !this.checked)
                              .val(this.checked ? "0px" : "");
          });

          $('.grab-padding').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'padding': $(this).val()
            });
          });
          
          $('.enable-margin').on('change', function() {
            $('.grab-margin').prop('disabled', !this.checked)
                              .val(this.checked ? "0px" : "");
          });
          
          $('.grab-margin').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'margin': $(this).val()
            });
          });
          
          $('.enable-opacity').on('change', function() {
            $('.grab-opacity').prop('disabled', !this.checked)
                              .val(this.checked ? "1" : "");
          });
          
          $('.grab-opacity').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'opacity': $(this).val()
            });
          });
          
          $('.enable-overflow').on('change', function() {
            $('.grab-overflow').prop('disabled', !this.checked)
                              .val(this.checked ? "auto" : "");
          });
          
          $('.grab-overflow').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'overflow': $(this).val()
            });
          });
          
          $('.enable-transition').on('change', function() {
            $('.grab-transition').prop('disabled', !this.checked)
                              .val(this.checked ? "all 0s ease 0s" : "");
          });
          
          $('.grab-transition').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'transition': $(this).val()
            });
          });
          
          $('.enable-transform').on('change', function() {
            $('.grab-transform').prop('disabled', !this.checked)
                              .val(this.checked ? "none" : "");
          });
          
          $('.grab-transform').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'transform': $(this).val()
            });
          });
          
          $('.enable-filter').on('change', function() {
            $('.grab-filter').prop('disabled', !this.checked)
                              .val(this.checked ? "none" : "");
          });
          
          $('.grab-filter').on('keyup change', function() {
            $("." + $('.findclassname').val()).css({
              'filter': $(this).val()
            });
          });
          
        } else {
          return false;
        }
      });
      
      // DIV Tool
      $('.div-tool').click(function() {
        $(".inspector").trigger('click');
        $(this).toggleClass('div-active');
        if ($('.div-active').is(':visible')) {
          $('.dialogs').val('div-properties').trigger('change');
          drawable = 1;
          
          // Disable div drag selections.
          $('.canves').addClass('noselect');
          
          if ($('.select-active, .remove-active, .table-active, .edit-active, .menu-active').is(':visible')) {
            $('.select-active, .remove-active, .table-active, .edit-active, .menu-active').trigger('click');
          }
        } else {
          drawable = false;
          // Enable drag selections.
          $('.canves').removeClass('noselect');
        }
      });
      
      $('.canves').on('mousedown touchstart', function(e) {
        if(drawable){
          drawing = true;
          mS.x = e.pageX;
          mS.y = e.pageY;
          dBox = $("<div class='" + $('.setclassname').val() + "' />");
          $(this).append(dBox);
        }
      });
      
      $('.canves').on('mousemove touchmove', function(e) {
        if(drawing && drawable){
          var mPos = {x:e.pageX, y:e.pageY - 19};
          var css = {};
          css.position = 'absolute';
          css.top    = (mPos.y > mS.y) ? mS.y : mPos.y;
          css.left   = (mPos.x > mS.x) ? mS.x : mPos.x;
          css.width  = Math.abs(mPos.x - mS.x);
          css.height = Math.abs(mPos.y - mS.y);
          css.backgroundColor = 'rgba(0, 34, 102, 0.5)';
          css.border = '1px solid #fff';
          dBox.css(css);
          if ($('.div-active').is(':visible')) {
            $('#my-css').val("." + $('.setclassname').val() + " {\n position: absolute;\n top: " + dBox.css('top') + ";\n left: " + dBox.css('left') + ";\n width: " + dBox.css('width') + ";\n height: " + dBox.css('height') + ";\n background-color: rgba(0, 34, 102, 0.5);\n border: 1px solid #fff;\n}\n\n");
            $('#my-html').val("\n&lt;div class='" + $('.setclassname').val() + "'&gt;&lt;/div&gt;\n");
          }
        }
      }).on('mouseup touchend', function(e) {
        drawing  = false;
          if ($('.div-active').is(':visible')) {
            $('.mirror-css').append($('#my-css').val());
            $('.mirror-html').append($('#my-html').val());
            $('#code').val($('.mirror-code').text());
          }
      });
      
      // Remove Tool
      $(".remove-tool").click(function() {
        $(".inspector").trigger('click');
        $(this).toggleClass('remove-active');
        if ($('.remove-active').is(':visible')) {
          $('.dialogs').val('remove-properties').trigger('change');
          $(".starter-properties, .canves-properties").show();
          $(".select-properties, .div-properties, .image-properties, .table-properties, .filemenu").hide();
          
          if ($('.select-active, .div-active, .edit-active, .table-active, .menu-active').is(':visible')) {
            $('.select-active, .div-active, .edit-active, .table-active, .menu-active').trigger('click');
          }
        } else {
          enabled = false;
          return false;
        }
      });
      
      $('.canves *').on('mousedown touchstart', function() {
          if (enabled)
            $(this).remove();
            e.preventDefault();
       });
       
      // Table Tool
      $('.table-tool').click(function() {
        $(".inspector").trigger('click');
        $(this).toggleClass('table-active');
        if ($('.table-active').is(':visible')) {
          $('.dialogs').val('table-properties').trigger('change');
          
          if ($('.select-active, .div-active, .remove-active, .edit-active, .menu-active').is(':visible')) {
            $('.select-active, .div-active, .remove-active, .edit-active, .menu-active').trigger('click');
          }
        } else {
          return false;
        }
      });
      
      // Edit Tool
      $(".edit-tool").click(function() {
        $(".inspector").trigger('click');
        $(this).toggleClass('edit-active');
        if ($('.edit-active').is(':visible')) {
          $('.dialogs').val('edit-properties').trigger('change');
          
          // Manipulate Inline Elements
          $('.canves *').attr('contenteditable', true);
          $('#inactive-menubtns').hide();
          
          $('#idive, #idive a').click(function(e) {
            codeeditor(e); 
          });
          
          $('#idive select#elm-font-family').on('click change', function(e) {
            document.execCommand('FontName',false,$(this).val());
          });
          
          $('#idive select#elm-font-size').on('click change', function(e) {
            document.execCommand('FontSize',false,$(this).val());
          });
          
          $('#idive a#txtcolor').click(function(e) {
            document.execCommand('ForeColor',false,$('#elm-color').val());
          });
          
          $('#idive a#backcolor').click(function(e) {
            document.execCommand('BackColor',false,$('#elm-bgcolor').val());
          });
          
          $('#idive select#elm-txt-align').on('click change', function(e) {
            document.execCommand($(this).val(),false,null);
          });
          
          $('#idive select#elm-heading').on('click change', function(e) {
            document.execCommand('formatBlock',false,$(this).val());
          });
          
          if ($('.select-active, .div-active, .remove-active, .table-active, .menu-active').is(':visible')) {
            $('.select-active, .div-active, .remove-active, .table-active, .menu-active').trigger('click');
          }
        } else {
          $('.canves *').attr('contenteditable', false);
          $('#inactive-menubtns').show();
        }
      });
      
      // Filemenu
      $(".menu").click(function() {
        $(this).toggleClass('menu-active');
        if ($('.menu-active').is(':visible')) {
          $('.dialogs').val('filemenu').trigger('change');
          $('.starter-properties, .canves-properties, .filemenu').show();
        
          $('.drop').click(function() {
            $('.drop-section').hide();
            $('.drop').css('color', '#666');
            $(this).next().hide();
            $(this).css('color', '#999');
            $(this).next().show();
          });
          
          // Toggle Crosshair & Mouse Position Display
          $('.crosshair').click(function() {
            $(this).toggleClass('fa-circle-o fa-circle d1-active');
            $('.hair').toggle();
          });
          $('.showmousepos').click(function() {
            $(this).toggleClass('fa-circle-o fa-circle d1-active');
            $('#mousepos').toggle();
          });
          
          if ($('.select-active, .div-active, .edit-active, .remove-active, .table-active').is(':visible')) {
            $('.select-active, .div-active, .edit-active, .remove-active, .table-active').trigger('click');
          }
        
        } else {
          $('.filemenu').hide();
          $(this).removeClass('drop-active');
          return false;
        }
        
        // Crosshair
        var cH = $('#crosshair-h'),
          cV = $('#crosshair-v'),
          canvesPosition = $('.canves').position();

        $(document).on('mousemove touchmove', function(e) {
          var x = e.pageX - canvesPosition.left;
          var y = e.pageY - canvesPosition.top;
          cH.css('top', e.pageY);
          cV.css('left', e.pageX);
          $('#mousepos').css({
              top: e.pageY + 'px',
              left: e.pageX + 'px'
          });
          $('#mousepos').text( "X: " + x + "px, Y: " + y + "px");
        });
      });
      
      // When no tools are active show head and canvas properties
      $(".select-tool, .div-tool, .image-tool, .table-tool, .edit-tool, .menu").on("mouseup touchend", function() {
        if ($(".select-properties, .div-properties, .image-properties, .table-properties").is(':hidden')) {
          $(".starter-properties, .canves-properties").show();
          $(".select-properties, .div-properties, .image-properties, .table-properties, .filemenu").hide();
        }
      });
      
      $(".select-properties, .div-properties, .image-properties, .table-properties").hide();
      
    });
  });
    
  // Set & Adjust Canvas Size
  $(function() {
    $('.canves').css({
      'width' : $('.cwidth').val(),
      'height' : $('.cheight').val()
    });
    
    $('.cwidth, .cheight').on('keyup', function() {
      $('.canves').css({
        'width' : $('.cwidth').val(),
        'height' : $('.cheight').val()
      });
    });
  });
  
  // Handles Drop Section Styles
  $(function() {
    $('.drop-section a').click(function() {
      $(this).toggleClass('active-btn');
    });
    
    // Border Styles
    $(function() {
      $('.none').click(function() {
        $('.borders a').removeClass('border-active');
        $('.borders a').css({
          'border-color': '#a9a9a9',
          'background-color': '#444'
        });
        $(this).addClass('border-active');
        $(this).css('border-color', '#1c1c1c');
      });
      
      $('.solid, .dotted, .dashed, .double, .ridge, .groove, .inset, .outset').click(function() {
        $('.grab-border a, .borders a').removeClass('border-active');
        $('.grab-border a, .borders a').css({
          'border-color': '#a9a9a9',
          'background-color': '#444'
        });
        $('.none').css('border-color', '#444');
        $(this).addClass('border-active');
      });
    });
  });
  
  // Autocomplete Search
  $(".search").on('keyup change', function() {
    var $val = $(this).val();
      
    if($.inArray($val.toLowerCase(), ["save"]) > -1) {
      saveTextAsFile();
    }
    
    if($.inArray($val.toLowerCase(), ["all"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#999').next().show();
    }
    
    if($.inArray($val.toLowerCase(), ["none"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#666').next().hide();
    }
    
    if($.inArray($val.toLowerCase(), ["uncheck all"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " input[type=checkbox]").prop('checked', false);
    }
    
    if($.inArray($val.toLowerCase(), ["class name", "position", "size", "background", "border", "typography", "advanced"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#666').next().hide();
      if ($.inArray($val.toLowerCase(), [$(".classname").prop('title'), $(".classname").prop('title').toLowerCase()]) > -1) {
        $(".classname").css( "color", "#999" );
        $(".classname").next().show();
      }
      
      if ($.inArray($val.toLowerCase(), [$(".pos").prop('title'), $(".pos").prop('title').toLowerCase()]) > -1) {
        $(".pos").css( "color", "#999" );
        $(".pos").next().show();
      }
      
      if ($.inArray($val.toLowerCase(), [$(".size-call").prop('title'), $(".size-call").prop('title').toLowerCase()]) > -1) {
        $(".size-call").css( "color", "#999" );
        $(".size-call").next().show();
      }

      if ($.inArray($val.toLowerCase(), [$(".bg-call").prop('title'), $(".bg-call").prop('title').toLowerCase()]) > -1) {
        $(".bg-call").css( "color", "#999" );
        $(".bg-call").next().show();
      }
      
      if ($.inArray($val.toLowerCase(), [$(".border-call").prop('title'), $(".border-call").prop('title').toLowerCase()]) > -1) {
        $(".border-call").css( "color", "#999" );
        $(".border-call").next().show();
      }
      
      if ($.inArray($val.toLowerCase(), [$(".txt-style-call").prop('title'), $(".txt-style-call").prop('title').toLowerCase()]) > -1) {
        $(".txt-style-call").css( "color", "#999" );
        $(".txt-style-call").next().show();
      }
      
      if ($.inArray($val.toLowerCase(), [$(".grab-advanced").prop('title'), $(".grab-advanced").prop('title').toLowerCase()]) > -1) {
        $(".grab-advanced").css( "color", "#999" );
        $(".grab-advanced").next().show();
      }
    }
  });
  
  // Detect Active Tool
  $(".dialogs").on('change', function() {
    var val = $(this).val();
    
    if( $("." + val) && $("." + val).length ){
      $('.show').hide();
      $("." + val).show();
    }
  });
  
  // Toggle Options Panel Dialog Visibility (Hide)
  $(".hide-options").click(function() {
    $(".show-options").slideDown();
    $(".toolbox").animate({
      right : "-300px"
    }, 200);
    $("#idive-container").animate({
      top : "36px",
      right : "0px"
    }, 200);
    $(".canves-container1").animate({
      top : "61px",
      right : "0px"
    }, 200);
  });
    
  // Toggle Options Panel Visibility (Show)
  $(".show-options").click(function () {
    $(this).slideUp();
    $(".toolbox").animate({
      right : "0px"
    }, 200);
    $("#idive-container").animate({
      top : "0px",
      right : "300px"
    }, 200);
    $(".canves-container1").animate({
      top : "25px",
      right : "300px"
    }, 200);
  });
  
});
