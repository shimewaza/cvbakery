define([
        'views/resume/itembase',
        'text!templates/resume/default/itemsharelink.html',
        'text!templates/resume/style1/itemsharelink.html',
        'text!templates/resume/style2/itemsharelink.html',
        'text!templates/resume/style3/itemsharelink.html',
        'text!templates/resume/style4/itemsharelink.html',
        'text!templates/resume/style5/itemsharelink.html'
], function(
    BaseView,
    defaultTemplate,
    style1Template,
    style2Template,
    style3Template,
    style4Template,
    style5Template) {

    var ShareLinkEditor = BaseView.extend({

        item: 'sharelink',

        itemName: "シェアリンク",

        itemIcon: 'icon-link',

        itemHelp: "このリンクであなたの履歴書をシェアしよう！",

        getTemplate: function() {
            if (this.options.templateRef === "default")
                return defaultTemplate;
            else if (this.options.templateRef === "style1")
                return style1Template;
            else if (this.options.templateRef === "style2")
                return style2Template;
            else if (this.options.templateRef === "style3")
                return style3Template;
            else if (this.options.templateRef === "style4")
                return style4Template;
            else if (this.options.templateRef === "style5")
                return style5Template;
        }

    });

    return ShareLinkEditor;
});