define([], function() {

    var Engineer = Backbone.DeepModel.extend({

        idAttribute: "_id",

        urlRoot: '/engineer',

        initialize: function() {

        },

        validate: function(attrs, options) {

            if (attrs.birthDay) {

                if ("Invalid Date" == new Date(attrs.birthDay))
                    return {
                        item: 'birthDay',
                        message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
                };
                if (new Date(attrs.birthDay) > new Date())
                    return {
                        item: 'birthDay',
                        message: '生年月日は本日より前の日付をご入力ください。'
                };
            }

            if (attrs.firstArrive) {

                if ("Invalid Date" == new Date(attrs.firstArrive))
                    return {
                        item: 'firstArrive',
                        message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
                };
                if (new Date(attrs.firstArrive) > new Date())
                    return {
                        item: 'firstArrive',
                        message: '生年月日は本日より前の日付をご入力ください。'
                };
            }

            if (attrs.itExperience) {

                var tempVal = new Number(attrs.itExperience);

                if (!_.isNumber(tempVal) || tempVal > 99)
                    return {
                        item: 'itExperience',
                        message: '年単位で有効な数字ををご入力ください。'
                };
            }

        }
    });

    return Engineer;
});