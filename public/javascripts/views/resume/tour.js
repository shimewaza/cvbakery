define([], function() {

	var tour = new Tour({
				template: "<div class='popover tour'>\
							    <div class='arrow'></div>\
							    <h3 class='popover-title'></h3>\
							    <div class='popover-content'></div>\
							    <div class='popover-navigation'>\
							        <button class='btn' data-role='prev'>前へ</button>\
							        <button class='btn' data-role='next'>次へ</button>\
							        <button class='btn' data-role='end'>終了</button>\
							    </div>\
							</div>",
				onNext: function() {
					$.removeCookie('tour_current_step');
					$.removeCookie('tour_end');
				},
				onEnd: function() {
					$.removeCookie('tour_current_step');
					$.removeCookie('tour_end');
				}
			});

	tour.addSteps([{
		element: "#photo img",
		title: "ここは顔写真です",
		content: "履歴書に写真をつけるのはイメージアップには効果的。",
		onHide: function() {
			self.photoView.switchToEditor();
		}
	}, {
		element: "#photo img",
		title: "顔写真を添付しましょう",
		content: "写真をクリックすると、操作ボタン表示します。",
	}, {
		element: "#photo .fileinput-button",
		title: "顔写真を添付しましょう",
		content: "これはアップロードボタンです、クリックして写真選択してから写真表示します。",
		placement: "bottom",
		onHide: function() {
			self.photoView.switchToValue();
		}
	}, {
		element: "#basic-info",
		title: "こちらは基本情報です",
		content: "各項目クリックしたら、編集できます。",
		backdrop: true,
		onHide: function() {
			self.telNoView.switchToEditor();
		}
	}, {
		element: "#telNo .span4",
		title: "例えば、電話番号をクリックしたら",
		content: '編集パネルが出てきます、ここで入力できます。項目自体を履歴書に載せたくない場合は、\
				<button class="btn btn-small btn-warning btn-remove"><i class="icon-remove icon-white"></i></button>\
				ボタンで隠せます。',
		placement: "left",
		onHide: function() {
			self.telNoView.switchToValue();
		}
	}, {
		element: "#skill .icon-gears",
		title: "複合な項目もあります",
		content: "複合項目は、複数の情報を持たせることができます。初めての時はレコード0件です。",
		placement: "top",
		onHide: function() {
			self.skillComposite.switchToEditor();
		}
	}, {
		element: "#skill .icon-gears",
		title: "複合な項目もあります",
		content: "基本情報と同じく、クリックしだい編集できます。",
		placement: "top"
	}, {
		element: "#skill .btn-add",
		title: "スキルを例としたら",
		content: 'レコード作成、追加する場合は、\
				<button class="btn btn-small btn-info btn-add"><i class="icon-plus icon-white"></i></button>\
				ボタンをクリックします。',
		placement: "bottom",
		onHide: function() {
			self.skillComposite.addItem();
		}
	}, {
		element: "#skill .item-container .sl-editor",
		title: "スキルを例としたら",
		content: 'これは新たに作成したレコードです。',
		placement: "left"
	}, {
		element: "#skill .item-container .sl-editor input",
		title: "スキルを例としたら",
		content: 'ここでスキルの名称を入力出来ます。',
		placement: "bottom"
	}, {
		element: "#skill .item-container .sl-editor .sl-slider",
		title: "スキルを例としたら",
		content: 'ここはスキルレベルを示すゲージです、ハンドルをドラグして調整出来ます。',
		placement: "bottom"
	}, {
		element: "#skill .item-container .sl-editor .btn-delete",
		title: "スキルを例としたら",
		content: '該当レコードを不要となりましたら、\
				<button class="btn btn-small btn-danger btn-delete"><i class="icon-minus icon-white"></i></button>\
				ボタンで削除できます。',
		placement: "bottom",
		onHide: function() {
			self.skillComposite.switchToValue();
			self.educationComposite.switchToEditor();
			self.educationComposite.addItem();
		}
	}, {
		element: "#education .item-container .sl-editor",
		title: "他の項目も同じです",
		content: '項目により編集できる内容が違うですが、使い方は一緒です。',
		placement: "left",
		onHide: function() {
			self.educationComposite.switchToValue();
			$('#resumeContextMenu').css({
				display: 'block',
				top: '300px',
				left: '300px'
			});
		}
	}, {
		element: "#resumeContextMenu",
		title: "これはメニューです",
		content: '履歴書上に右クリックしたら、メニューが表示します。'
	}, {
		element: "#resumeContextMenu .template",
		title: "フォーマット変更",
		content: 'CV Bakeryは色んな履歴書フォーマットを提供します、変更するにはお好きなフォーマットボタン押すだけ。'
	}, {
		element: "#resumeContextMenu .item",
		title: "項目の追加、復旧",
		content: '各<button class="btn btn-small btn-warning btn-remove"><i class="icon-remove icon-white"></i></button>\
				で隠された項目は、メニューのここに格納されています。ボタン押すと、該当項目は履歴書に載せられます。'
	}, {
		element: "#resumeContextMenu .background",
		title: "背景の文様を変わる",
		content: 'これらのボタンをクリックすると、履歴書の背景を変わることができます。'
	}, {
		element: "#resumeContextMenu .output",
		title: "履歴書を出力",
		content: '履歴書の出力、印刷などできます。',
		onHide: function() {
			$('#resumeContextMenu').css({
				display: '',
				top: '0',
				left: '0'
			});
		}
	}, ]);

	return tour;
});