$(function() {
	/* ======== Model ========= */
	var model = {
		currentCat: null,
		cats: [
				{name: 'Beebo', clicks: 0, img:'img/pallas-cat-manul.jpg', imgAttribution: "http://www.boredpanda.com/" },
				{name: 'Jonny', clicks: 0, img:'img/funny-karate-cat.jpg', imgAttribution: 'https://newbloggycat.com/'},
				{name: 'Susie', clicks: 0, img: "img/bringing-home-new-cat.jpg", imgAttribution: 'https://www.petfinder.com/cats/bringing-a-cat-home/bringing-home-new-cat/99233806-bringing-home-new-cat-632x475/'},
				{name: 'Ron', clicks: 0, img: "img/pexels-photo-126407.jpeg", imgAttribution: 'https://www.pexels.com/'},
				{name: 'Boothang', clicks: 0, img: "img/cat-wants-to-tell-you-laptop.jpg", imgAttribution: 'http://www.rd.com/advice/pets/how-to-decode-your-cats-behavior/'}
			],
	};

	/* ======== Controller ========= */

	var controller = {
		init: function() {
			// set currentCat to first cat in the list
			model.currentCat = model.cats[0];

			// initialize views
			catView.init();
			catList.init();
		},

		getCurrentCat: function() {
			return model.currentCat;
		},

		getCats: function() {
			return model.cats;
		},

		setCurrentCat: function(catName){
			for(var i = 0; i < model.cats.length; i++){
				if(model.cats[i].name===catName){
					return model.currentCat = model.cats[i];
				}
			}
		},

		incrementClicks: function() {
			model.currentCat.clicks++;
			catView.render();
		},
	};

	var catView = {
		init: function() {
			this.catImage = $('#cat-image');
			this.catName = $('#cat-name');
			this.catClicks = $('#cat-clicks');
			this.figcaption = $('#figcaption'); 
			
			this.catImage.on('click', function() {
					var catImage = this;
					controller.incrementClicks();
					catView.render(name);
			});

			this.render();
		},

		render: function() {
				var cat = controller.getCurrentCat();
				this.catImage.attr("src",cat.img);
				this.catImage.attr("name",cat.name);
				this.catName.html(cat.name);
				this.figcaption.html('Image courtesy of: <a href="' + cat.imgAttribution + '" target="_blank">' + cat.imgAttribution + '</a>');
				if(cat.clicks === 1) {
					this.catClicks.html("You have clicked " + cat.name + " " + cat.clicks + " time");
				} else {
					this.catClicks.html("You have clicked " + cat.name + " " + cat.clicks + " times");
				}
			}
	};

	var catList = {
		init: function() {
			this.catList = $('#cat-list');
			this.render();

			$('.collection-item').first().addClass("active");

			this.catList.on('click', '.collection-item', function(){
				$('.collection-item').removeClass("active");
				$(this).toggleClass("active");
				var cat = $(this).data().id;
				controller.setCurrentCat(cat);
				catView.render();
			});
		},

		render: function() {
			var htmlStr= '';
			
			controller.getCats().forEach(function(cat) {
				htmlStr += '<a href="#!" class="collection-item" data-id="' + cat.name + '">' + cat.name + '</a>'
			});
			this.catList.html(htmlStr);
		}

	};
	controller.init();
});