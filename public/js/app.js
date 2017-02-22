$(function() {
	var model = {
		currentCat: null,
		cats: [
				{name: 'Beebo', clicks: 0, img:'http://static.boredpanda.com/blog/wp-content/uploads/2015/06/pallas-cat-manul-7__880.jpg', imgAttribution: "http://www.boredpanda.com/" },
				{name: 'Jonny', clicks: 0, img:'https://newbloggycat.files.wordpress.com/2015/07/funny-karate-cat.jpg', imgAttribution: 'https://newbloggycat.com/'},
				{name: 'Susie', clicks: 0, img: "https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg", imgAttribution: 'https://www.petfinder.com/cats/bringing-a-cat-home/bringing-home-new-cat/99233806-bringing-home-new-cat-632x475/'},
				{name: 'Ron', clicks: 0, img: "https://static.pexels.com/photos/126407/pexels-photo-126407.jpeg", imgAttribution: 'https://www.pexels.com/'},
				{name: 'Boothang', clicks: 0, img: "http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg", imgAttribution: 'http://www.rd.com/advice/pets/how-to-decode-your-cats-behavior/'}
			],
		
		incrementClicks: function(name) {
			for(var i = 0; i < this.cats.length; i++) {
				if(this.cats[i].name === name) {
					this.cats[i].clicks++;
				}
			}
		},
		getCats: function() {
			return this.cats;
		},
		getOneCat: function(cat) {
			for(var i = 0; i < this.cats.length; i++) {
				if(this.cats[i].name === cat) {
					return this.cats[i];
				}
			}
		}
	};

	var controller = {
		init: function() {
			catView.init();
			catList.init();
		},
		getCats: function() {
			return model.getCats();
		},
		getOneCat: function(cat){
			return model.getOneCat(cat);
		},
		incrementClicks: function(name) {
			model.incrementClicks(name);
		}
	};

	var catView = {
		init: function() {
			this.catImage = $('#cat-image');
			this.catName = $('#cat-name');
			this.catClicks = $('#cat-clicks');
			this.figcaption = $('#figcaption'); 
			var cats = controller.getCats();
			catView.render(cats[0].name);
			this.catImage.on('click', function() {
					var catImage = this;
					var name = catImage.name;
					controller.incrementClicks(name);
					catView.render(name);
			});
		},
		render: function(cat) {
				var cat = controller.getOneCat(cat);
				this.catImage.attr("src",cat.img);
				this.catImage.attr("name",cat.name);
				this.catName.html(cat.name);
				this.figcaption.html('Image courtesy of: <a href="' + cat.imgAttribution + '">' + cat.imgAttribution + '</a>');
				if(cat.clicks === 1) {
					this.catClicks.html(cat.name + " has been clicked " + cat.clicks + " time");
				} else {
					this.catClicks.html(cat.name + " has been clicked " + cat.clicks + " times");
				}
			}
	};

	var catList = {
		init: function() {
			this.catList = $('#cat-list');
			catList.render();
			$('.collection-item').first().addClass("active");

			this.catList.on('click', '.collection-item', function(){
				$('.collection-item').removeClass("active");
				$(this).toggleClass("active");
				var cat = $(this).data().id;
				catView.render(cat);
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