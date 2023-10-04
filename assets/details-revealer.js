class DetailsRevealer extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;
    this.contentElement = this.content.querySelector(".mega--menu");

    this.mainDetailsToggle.addEventListener(
      "click",
      this.onSummaryHoverClick.bind(this, false)
    );

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
  }
onSummaryHoverClick(event, keystate) {
    const summaryElement = event.currentTarget;
    var mainDetailsToggle = this.mainDetailsToggle;
    var contentElement = this.contentElement;
    var animations;
    if (this.contentElement) animations = this.contentElement.getAnimations();
    if (!mainDetailsToggle.hasAttribute("open")) {
      setTimeout(
        function () {
          var _isHover = mainDetailsToggle.querySelector(":hover");
          if (_isHover) {
            if (!mainDetailsToggle.hasAttribute("open")) {
              mainDetailsToggle.querySelector("summary").focus();
              mainDetailsToggle.setAttribute("open", true);
              mainDetailsToggle.setAttribute("opened", true);
              mainDetailsToggle
                .querySelector("summary")
                .setAttribute("aria-expanded", true);
              /*document.querySelector('.top-header').classList.remove('box-shadow-menu');*/
              /*var headerSearch = document.querySelector('.header__search');
          var headerSearchDetails = headerSearch.querySelector('details');
          if(headerSearchDetails.hasAttribute('open')){
            headerSearchDetails.removeAttribute('open');
            headerSearchDetails.removeAttribute('opened');        
            headerSearchDetails.querySelector('summary').setAttribute('aria-expanded', false);
          }*/
              setTimeout(function () {
                if (mainDetailsToggle.hasAttribute("open")) {
                  if (!mainDetailsToggle.hasAttribute("opened")) {
                    animations.forEach((animation) => animation.play());
                  }
                } else {
                  animations.forEach((animation) => animation.finish());
                }
              }, 100);

              if (keystate.type == "mouseenter")
                mainDetailsToggle.querySelector("summary").style.outline =
                  "none";

              if (!animations) animations = contentElement.getAnimations();
              if (keystate.type != "keyup") {
                if (mainDetailsToggle.hasAttribute("open")) {
                  if (!mainDetailsToggle.hasAttribute("opened")) {
                    animations.forEach((animation) => animation.play());
                  }
                } else {
                  animations.forEach((animation) => animation.finish());
                }
              }
              mainDetailsToggle.setAttribute("opened", true);
            }
          }
        },
        10,
        mainDetailsToggle,
        animations,
        contentElement
      );
    }
  }
  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-revealer', DetailsRevealer);

class HeaderMenu extends DetailsRevealer {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
    document.documentElement.style.setProperty(
      '--header-bottom-position-desktop',
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
    );
  }
}

customElements.define('header-menu', HeaderMenu);
