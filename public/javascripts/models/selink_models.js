var User = Backbone.Model.extend({});

var Account = Backbone.Model.extend({});

var Menu = Backbone.Model.extend({});

var Profile = Backbone.Model.extend({
	idAttribute: "_id"
});

var Engineer = Backbone.Model.extend({

	defaults: {
		firstName: "",
		lastName: "",
		firstNameEn: "",
		lastNameEn: "",
		firstNameKana: "",
		lastNameKana: "",
		birthDay: "",
		gender: "",
		nationality: "",
		married: "",
		firstArrive: "",
		itExperience: "",
		nearestStation: "",
		dateOfAvailable: "",
		telNo: "",
		email: "",
		zipCode: "",
		address: "",
		salaryTop: "",
		salaryBottom: "",
		selfIntroduction: "",
		skillRemark: "",
		publish: "",
		logicDelete: "",
		createDate: "",
		createUser: "",
		updateDate: "",
		updateUser: ""
	},
	
	idAttribute: "_id",

	url: '/engineer/',

	initialize: function(){

		console.log("Enginner has been initialized.");

		this.on("change", function(){

			console.log("Engineer status has changed: " + this.toJSON().toString());
		});
	}
});

var Engineers = Backbone.Collection.extend({
	model: Engineer,
});