define([], function() {

    var Resume = Backbone.DeepModel.extend({

        idAttribute: "_id",

        urlRoot: '/resume',

        pattern: {
            telNo: /^\d{2,3}-\d{4}-\d{4}$/
        },

        initialize: function() {

        },

        validate: function(attrs, options) {

        /*    // Check birth day
            if (attrs.birthDay) {
                // must be a date
                if ("Invalid Date" == new Date(attrs.birthDay))
                    return {
                        item: 'birthDay',
                        message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
                };
                // can't late than today
                if (new Date(attrs.birthDay) > new Date())
                    return {
                        item: 'birthDay',
                        message: '生年月日は本日より前の日付をご入力ください。'
                };
            }

            // Check first arrive date
            if (attrs.firstArrive) {
                // must be a date
                if ("Invalid Date" == new Date(attrs.firstArrive))
                    return {
                        item: 'firstArrive',
                        message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
                };
                // can't late than today
                if (new Date(attrs.firstArrive) > new Date())
                    return {
                        item: 'firstArrive',
                        message: '生年月日は本日より前の日付をご入力ください。'
                };
            }

            // Check the number of year of IT experience
            if (attrs.itExperience) {

                // TODO: this is wrong
                var tempVal = new Number(attrs.itExperience);
                // must be a number, and can't bigger than 99
                if (!_.isNumber(tempVal) || tempVal > 99)
                    return {
                        item: 'itExperience',
                        message: '年単位で有効な数字ををご入力ください。'
                };
            }

            // Check first arrive date
            if (attrs.firstArrive) {
                // must be a date
                if ("Invalid Date" == new Date(attrs.firstArrive))
                    return {
                        item: 'firstArrive',
                        message: '「yyyy/mm/dd」のフォーマットで有効な日付をご入力ください。'
                };
                // can't late than today
                if (new Date(attrs.firstArrive) > new Date())
                    return {
                        item: 'firstArrive',
                        message: '生年月日は本日より前の日付をご入力ください。'
                };
            }

            if (attrs.zipCode) {
                return {
                        item: 'zipCode',
                        message: '有効な郵便番号をご入力ください。'
                };
            }

            if (attrs.address) {
                if (attrs.address.length > 50)
                    return {
                        item: 'address',
                        message: '50文字以内をご入力ください。'
                };
            }

            if (attrs.nearestStation) {
                if (attrs.nearestStation.length > 50)
                    return {
                        item: 'nearestStation',
                        message: '50文字以内をご入力ください。'
                };
            }

            if (attrs.telNo && attrs.telNo.length) {

                var self = this;
                var position = [];

                _.each(attrs.telNo, function(tel, index) {
                    if (tel.search(self.pattern.telNo))
                        position.push(index);
                });

                if (position.length)
                    return {
                        item: 'telNo',
                        message: '有効な電話番号をご入力ください。',
                        position: position
                };
            }*/
        }
    });

    return Resume;
});