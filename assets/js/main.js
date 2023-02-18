//Begin date
const dayBegin = new Date("08/18/2022");
let dateNow = new Date();

// get total seconds between the times
let delta = Math.abs(dayBegin - dateNow) / 1000;

// calculate (and subtract) whole days
let days = Math.floor(delta / 86400);
delta -= days * 86400;

// calculate (and subtract) whole hours
let hours = Math.floor(delta / 3600) % 24;
delta -= hours * 3600;

// calculate (and subtract) whole minutes
let minutes = Math.floor(delta / 60) % 60;
delta -= minutes * 60;

// what's left is seconds
let seconds = Math.floor(delta % 60); // in theory the modulus is not required

// Get time
// const time = document.querySelectorAll(".timer__time__box");
let day = document.querySelector(".timer__time__box--day");
let hour = document.querySelector(".timer__time__box--hour");
let minute = document.querySelector(".timer__time__box--minute");
let second = document.querySelector(".timer__time__box--second");

setInterval(() => {
	dateNow = new Date();
	delta = Math.abs(dayBegin - dateNow) / 1000;
	days = Math.floor(delta / 86400);

	hours = dateNow.getHours();

	minutes = dateNow.getMinutes();

	seconds = dateNow.getSeconds();

	let timeNow = [days, hours, minutes, seconds]
	let timeDisplay = [day, hour, minute, second]
	for (let i in timeNow) {
		if (parseInt(timeDisplay[i].childNodes[1].textContent) !== timeNow[i]) {
			flipLayer(timeDisplay[i])
			changeTimeDisplay(timeDisplay[i], timeNow[i])
		}
	}
}, 200);

function changeTimeDisplay(timeDisplay, timeNow) {
	timeDisplay.childNodes[1].textContent = timeNow
	timeDisplay.childNodes[1].textContent = timeDisplay.childNodes[1].textContent.padStart(2, "0");
}

const flipLayer = (e) => {
	e.childNodes[7].style.display = "block";
	setTimeout(() => {
		e.childNodes[7].style.display = "none";
	}, 300);
};


// --------------HEADER--------------
let headerTitle = document.querySelector(".header__title");
let header = document.querySelector(".header");
let headerBoxSize = document.querySelectorAll(".header__layer > div > div:last-child");
let headerBox = document.querySelectorAll(".header__img-box");

var scale = 0;
let fill__heart = setInterval(() => {
	if (scale >= 100) {
		clearInterval(fill__heart);
		headerTitle.textContent = '100%';
		headerTitle.style.display = 'none';

		for (let box of headerBox) {
			box.style.animation = "1.2s cubic-bezier(.52,-0.13,.5,1) 0s normal none 1 running heart_beat";
		}

		setTimeout(() => {
			openHeaderLayer();
			showUpPage();
			setTimeout(() => {
				offHeader();
			}, 1350);
		}, 1300)
	}
	headerTitle.textContent = scale + '%';
	for (let box of headerBoxSize) {
		box.style.transform = 'scale(' + scale / 100 + ')';
	}
	scale += Math.floor(Math.random() * 5);
}, 100)

let headerLayer = document.querySelectorAll(".header__layer > div");
let openHeaderLayer = () => {
	for (let layer of headerLayer)
		layer.style.animation = "1s .3s forwards linear slide-header"
}

let page = document.querySelector(".page");
let showUpPage = () => {
	page.style.display = "flex";
}

let offHeader = () => {
	header.style.display = "none";
}

// -------------------gallery-----------------------
let galleryImg = document.querySelectorAll(".gallery__container__img > img");
for (var img of galleryImg) {
	img.addEventListener("animationiteration", (e) => {
		if (e.animationName === "slide") {
			let value = img.style.getPropertyValue("--r");
			// console.log(value, img.style.getPropertyValue("--r"));
			let rotateDeg = parseFloat(value.substring(0, value.length - 3));
			// img.style.setProperty("--r", `${-10 + Math.random() * 20}deg`)
			// img.style.setProperty("--r", `${rotateDeg - Math.random() * 2 - 1}deg`)
		}
	})
}

let video = document.querySelector(".gallery__container__video > video");
let videoSource = document.querySelector(".gallery__container__video > video > source");
let videoNavigation = document.querySelectorAll(".gallery__container__video > div");
let listVideo = [
	"./assets/images/gallery/video/684250561726232516.mp4",
	"./assets/images/gallery/video/317953385_550666047071643_5910118757427852625_n.mp4",
	"./assets/images/gallery/video/323880992_689398309234720_667842889744911135_n.mp4",
	"./assets/images/gallery/video/327110803_2507088182774616_5448470952516178958_n.mp4"
];
let index = 0;
for (let i in videoNavigation) {
	if (i == 0) videoNavigation[0].addEventListener("click", onNavigationClickLeft)
	else videoNavigation[1].addEventListener("click", onNavigationClickRight)
}

function onNavigationClickLeft() {
	index--;
	if (index < 0) index = listVideo.length - 1;
	videoSource.setAttribute("src", listVideo[index]);
	video.load();
}

function onNavigationClickRight() {
	index++;
	if (index == listVideo.length) index = 0;
	videoSource.setAttribute("src", listVideo[index]);
	video.load();
}

setInterval(() => {
	if (video.paused)
		for (let nav of videoNavigation)
			nav.style.opacity = "1";
	else
		for (let nav of videoNavigation)
			nav.style.opacity = "0";

}, 1)


// -------------------SNOW----------------------

function snowFlakesEffect() {
	let snowFlakes = document.querySelectorAll(".snowflake");
	for (let snow of snowFlakes) {
		snow.style.left = Math.random() * 100 + '%';
		snow.style.animationDelay = Math.random() * 5 + 's, ' + Math.random() * 3 + 's';
		snow.style.animationDuration = (Math.random() * 3 + 8) + 's, ' + (Math.random() * 2 + 3) + 's';

		snow.addEventListener("animationiteration", (e) => {
			if (e.animationName === "snowflakes-fall") {
				snow.style.left = Math.random() * 100 + '%';
			}
		})
	}
}

// -----------------------------------------------
let snowflakesContainer = document.querySelector(".snowflakes")
function switchSnowflakes(e) {
	e.childNodes[1].classList.toggle("switch-on")
	console.log(e.childNodes[1])
	if (snowflakesContainer.innerHTML == "")
		snowflakesContainer.innerHTML =`
		<div class="snowflake">❅</div>
		<div class="snowflake">❆</div>
		<div class="snowflake">❅</div>
		<div class="snowflake">❆</div>
		<div class="snowflake">❅</div>
		<div class="snowflake">❆</div>
		<div class="snowflake">❅</div>
		<div class="snowflake">❆</div>
		<div class="snowflake">❅</div>
		<div class="snowflake">❆</div>
		<div class="snowflake">❆</div>
		<div class="snowflake">❆</div>
		<div class="snowflake">❅</div>
		<div class="snowflake">❆</div>
		<div class="snowflake">❅</div>
		<div class="snowflake">❅</div>
		<div class="snowflake">❆</div>
		<div class="snowflake">❅</div>
		<div class="snowflake">❆</div>
		<div class="snowflake">❅</div> `
	else snowflakesContainer.innerHTML = "";
	snowFlakesEffect();
}

let switchContainer = document.querySelector(".switch__container");

function fadedOutSwitchIcon(e) {
	e.style.opacity = "0";
	switchContainer.style.transform = "scale(100%)";
}

function showUpSwitchIcon(e) {
	e.style.opacity = "1";
	switchContainer.style.transform = "scale(0)";
}

function showUpSwitchContainer(e) {
	e.parentNode.childNodes[1].style.opacity = "0";
	e.style.transform = "scale(100%)";

}

function showOffSwitchContainer(e) {
	e.parentNode.childNodes[1].style.opacity = "1";
	e.style.transform = "scale(0)";
	// console.log("off")

}


// --------------------INTRO---------------------- //

let intro = document.querySelector(".intro");
let introFooterTitle = document.querySelector(".intro__footer__title");
let sunMoon = document.querySelector(".intro__sun-moon");
let borderChangeBg = document.querySelectorAll(".intro__border-change-color")
let introFooter = document.querySelector(".intro__footer");
let introTitleLayer = document.querySelector(".intro__title");
let introTitleLayerLeft = document.querySelector(".intro__title__layer:first-child")
let introTitleLayerRight = document.querySelector('.intro__title__layer:last-child')
let switchBtn = document.querySelector(".switch");

let gallery = document.querySelector(".gallery");
let galleryTitle = document.querySelector('.gallery__title');
let galleryContainerHeartCover = document.querySelector(".gallery__container__heart__cover");
let galleryContainerHeartTotal = document.querySelector(".gallery__container__heart__total")
let galleryContainerHeartText = document.querySelector(".gallery__container__heart__text");

const listOfIntroBg = [
	"#FFE15D", "#FBCA47", "#F8B430", "#F49D1A",
	"#205295", "#19437B", "#113561", "#0A2647"
]


function touches(a, b) {
	var aRect = a.getBoundingClientRect();
	var bRect = b.getBoundingClientRect();

	return !(
		((aRect.top + aRect.height) < (bRect.top)) ||
		(aRect.top > (bRect.top + bRect.height)) ||
		((aRect.left + aRect.width) < bRect.left) ||
		(aRect.left > (bRect.left + bRect.width))
	);
}

if (touches(sunMoon, gallery))
	intro.style.backgroundColor = listOfIntroBg[7];
else intro.style.backgroundColor = listOfIntroBg[0];

intro.style.backgroundColor = listOfIntroBg[0];
window.addEventListener("scroll", f)
window.addEventListener("resize", f)

function f(e) {
	let x = window.scrollY;
	sunMoon.style.top = `${x * 0.3}px`;

	for (let i = 0; i < listOfIntroBg.length; i++) {
		if (touches(sunMoon, borderChangeBg[i])) {
			intro.style.backgroundColor = listOfIntroBg[i];
			// console.log("Touched: ", i)
			if (i == 3) showUpIntroTitle();
		}
	}

	if (touches(sunMoon, introTitleLayer)) splitIntroTitleOut()
	else splitIntroTitleIn();
	if (touches(sunMoon, introFooter)) sunMoon.classList.add("moon");
	else sunMoon.classList.remove("moon");

	if (!touches(sunMoon, intro)) sunMoon.classList.add('fade-out');
	else sunMoon.classList.remove('fade-out');

	if (touches(switchBtn, gallery)) {
		for (let heart of galleryContainerHeartCover.querySelectorAll("div"))
			heart.classList.add("rotate-in");
		galleryContainerHeartText.classList.add("show-up-text");
		galleryContainerHeartCover.style.animation = "heart_beat_2 .7s 2.2s linear";
	}
	else {
		galleryContainerHeartCover.style.animation = "none";
		galleryContainerHeartCover.style.animation = "heart_beat .7s 2.2s linear";
	}

	// let pos = gallery.getBoundingClientRect()
	// console.log(pos.top, window.innerHeight / 2 - 30)
	// console.log(pos.bottom, window.innerHeight / 2 - 30)
}

function jumping(e) {
	let pos = e.getBoundingClientRect()
	// console.log(pos.top, window.innerHeight / 2 - 30)
	// console.log(pos.bottom)

	if ((pos.top < window.innerHeight / 2 - 30) && (pos.bottom > window.innerHeight / 2 + 50)) {
		window.scrollTo(0, e.offsetTop);
	}
}

var scrollDelay = null;
window.addEventListener("scroll", () => {
	if (scrollDelay !== null) {
		clearTimeout(scrollDelay);
	}
	scrollDelay = setTimeout(function () {
		jumping(gallery);
		jumping(timer);
	}, 400);
}, false)


function showUpIntroTitle() {
	introFooterTitle.style.top = "65%";
	introFooterTitle.style.opacity = 1;
}

function splitIntroTitleOut() {
	introTitleLayerLeft.classList.add("swipe-out-left")
	introTitleLayerRight.classList.add("swipe-out-right")
}

function splitIntroTitleIn() {
	introTitleLayerLeft.classList.remove("swipe-out-left")
	introTitleLayerRight.classList.remove("swipe-out-right")
}

// -----------------DARK MODE----------------------
var root = document.querySelector(':root');

let timer = document.querySelector(".timer")
let timerBg = document.querySelectorAll(".timer img");

let galleryBg = document.querySelectorAll(".gallery > img");

// darkMode()
function darkMode(e) {
	for (let img of galleryBg)
		img.classList.toggle("fade-out");

	for (let img of timerBg)
		img.classList.toggle("fade-out");
	if (e.checked) {
		root.style.setProperty("--gallery_bg", "#3a6186")
		root.style.setProperty("--gallery_lg1", "#3a6186")
		root.style.setProperty("--gallery_lg2", "#89253e")
		root.style.setProperty("--gallery_faded-layer", "rgba(0, 0, 0, 0.1)")

		root.style.setProperty("--content", "#2b263a")
		root.style.setProperty("--content-darker", "#fb6087")

		root.style.setProperty("--text", "#ddd")

		root.style.setProperty("--switch-color", "white")
		root.style.setProperty("--switch-border", "rgba(255,255,255,0.5)")

	}
	else {
		root.style.setProperty("--gallery_bg", "#d9a7c7")
		root.style.setProperty("--gallery_lg1", "#fffcdc")
		root.style.setProperty("--gallery_lg2", "#d9a7c7")


		root.style.setProperty("--content", "#f89997")
		root.style.setProperty("--content-darker", "#d73e69b0")

		root.style.setProperty("--text", "#000000b3")

		root.style.setProperty("--switch-color", "black")
		root.style.setProperty("--switch-border", "#00000080")
	}
	
}
let defaultLocation = window.location.href;
defaultLocation = defaultLocation.substring(0, defaultLocation.indexOf('/'));

// ----------------------------RESPONSIVE-----------------------------------

let introBonus = document.querySelectorAll('.intro__bonus');
let introImg = document.querySelector('.intro > img')
let introFooterImg = document.querySelector('.intro__footer > img')

setInterval(() => {
	if (window.matchMedia('screen and (max-width: 768px)').matches) {
		for (let bg of introBonus)
			bg.classList.remove("display-none")
		introImg.style.bottom = "52%";
		introFooterImg.style.top = "4%";
	}
	else {
		for (let bg of introBonus)
			bg.classList.add("display-none")
		introImg.style.bottom = "50%";
		introFooterImg.style.top = "0";
	}
}, 10)