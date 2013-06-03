define([
    'text!templates/resume/languagebackground.html',
    'views/base/basepanel',
    'models/engineer'
], function(languageBackgroundTemplate, BaseView, engineerModel) {

  var LanguageBackgroundView = BaseView.extend({

    // This view is a div
    tagName: 'div',

    // Class on HTML page
    className: 'sl-editor row-fluid',

    // Template
    template: _.template(languageBackgroundTemplate),

    // Initializer
    initialize: function() {

      // Model Event: Listen on model's _id, so this view will be rendered on first load
      // this.listenTo(this.model, 'change', this.render);

      // View Event
      // this.events = _.extend({}, this.genericEvents, {
      //   // Switch to edit-mode when value was clicked
      //   'click .sl-value': 'switchToInput',
      //   // Switch to view-mode when input lost focus
      //   'blur .sl-input': 'switchToValue',
      //   // Update model when input's value was chenaged
      //   'change .sl-input': 'updateModel',
      // });
    },

    // Render
    render: function() {

      this.$el.html(this.template(this.model))
      .css('display', 'none')
      .appendTo('#sl-languangeBackground');

      return this;
    },

    show: function() {
      this.$el.slideDown();
    }

    // Switch sl-editor from view-mode to edit-mode
    // switchToInput: function(event) {

    //   var $target = $(event.target);
    //   var $value = $target.closest('.sl-editor').find('.sl-value');
    //   var $input = $target.closest('.sl-editor').find('.sl-input');
    //   var $control = $input.find('input,select,textarea');

    //   // FadeOut view panel
    //   $value.fadeOut(function() {
    //     // SlideDown edit panel
    //     $input.slideDown();
    //     // Attach popover for every control in edit panel
    //     $control.popover();
    //     // Let the first control in edit panel get focus
    //     $control.first().focus();
    //   });
    // },

    // Switch sl-editor from edit-mode to view-mode
    // switchToValue: function(event) {

    //   // If this method invoked immediately, user will not able to 
    //   // move to the next control in edit panel, so I wait 0.3 second
    //   window.setTimeout(function() {

    //     var $target = $(event.target);  
    //     var $value = $target.closest('.sl-editor').find('.sl-value');
    //     var $input = $target.closest('.sl-editor').find('.sl-input');
    //     var $control = $input.find('input,select,textarea');
    //     var stop = false;

    //     // If any control in edit panel still got focus, means user 
    //     // haven't leave the edit panel yet, switch will be terminated
    //     $control.each(function() {
    //       if($(this).is(":focus")) {
    //         stop = true;
    //         return false;
    //       }
    //     });

    //     // If none of the control got focus, SlideUp edit panel
    //     if(!stop) $input.slideUp(function() {
    //       // FadeIn view panel
    //       $value.fadeIn();
    //     });

    //   }, 300);
    // },

    // Update model when edit finished
    // updateModel: function(event) {

    //   var $target = $(event.target);  
    //   var $value = $target.closest('.sl-editor').find('.sl-value');
    //   var $input = $target.closest('.sl-editor').find('.sl-input');
    //   var $control = $input.find('input,select,textarea');
    //   var self = this;

    //   // Get key-value pair from every control, and set them to the model
    //   $control.each(function() {
    //     self.model.set($(this).attr('name'), $(this).val());
    //   });

    //   // Save the model
    //   this.model.save();

    //   // TODO: rerender the view panel
    //   $value.text($control.val());

    //   // Switch to view panel
    //   this.switchToValue(event);
    // }

  });

  return LanguageBackgroundView;
});