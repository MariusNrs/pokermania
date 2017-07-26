

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.SlidingMenu = (function() {
    var errorReport;

    SlidingMenu.itemActive;

    SlidingMenu.activeState;

    SlidingMenu.sliding;

    SlidingMenu.defaultData;

    SlidingMenu.options;

    SlidingMenu.callbacks;

    function SlidingMenu(options, callbacks) {
      this.setMouseOver = bind(this.setMouseOver, this);
      this.setSlidingData = bind(this.setSlidingData, this);
      this.setDefaultData = bind(this.setDefaultData, this);
      this.setActiveState = bind(this.setActiveState, this);
      this.createSliding = bind(this.createSliding, this);
      this.options = {
        'menu': options.menu,
        'items': options.items,
        'itemActiveClass': options.itemActiveClass != null ? options.itemActiveClass : options.itemActiveClass = 'active',
        'slidingClass': options.slidingClass != null ? options.slidingClass : options.slidingClass = '',
        'duration': options.duration != null ? options.duration : options.duration = 400,
        'direction': options.direction != null ? options.direction : options.direction = 'x'
      };
      this.callbacks = {
        'over': null,
        'leave': null
      };
      if (callbacks != null) {
        this.callbacks = callbacks;
      }
      this.createSliding();
      this.setActiveState();
      this.setDOMEvents();
    }

    SlidingMenu.prototype.createSliding = function() {
      this.sliding = $('<div class="menu-sliding ' + this.options.slidingClass + '"></div>');
      return this.sliding.appendTo(this.options.menu);
    };

    SlidingMenu.prototype.setActiveState = function() {
      this.options.items.each((function(_this) {
        return function(index, value) {
          if ($(value).hasClass(_this.options.itemActiveClass)) {
            return _this.itemActive = $(value);
          }
        };
      })(this));
      if (this.itemActive != null) {
        this.activeState = true;
        return this.setDefaultData();
      } else {
        return this.activeState = false;
      }
    };

    SlidingMenu.prototype.setDefaultData = function() {
      this.defaultData = {
        'left': this.itemActive.offset().left - this.options.menu.offset().left,
        'top': this.itemActive.offset().top - this.options.menu.offset().top,
        'width': this.itemActive.outerWidth(),
        'height': this.itemActive.outerHeight()
      };
      return this.setSlidingData();
    };

    SlidingMenu.prototype.setSlidingData = function() {
      this.sliding.css({
        'width': this.defaultData.width
      });
      if (this.options.direction === 'x') {
        return this.sliding.css({
          'left': this.defaultData.left
        });
      } else if (this.options.direction === 'y') {
        return this.sliding.css({
          'height': this.defaultData.height,
          'top': this.defaultData.top
        });
      } else {
        return errorReport(this.options.direction + " not support! Used x or y!");
      }
    };

    SlidingMenu.prototype.setDOMEvents = function() {
      this.setMouseOver();
      return this.setMouseLeave();
    };

    SlidingMenu.prototype.setMouseOver = function() {
      return this.options.items.on('mouseover', (function(_this) {
        return function(event) {
          var $self, animateOptions;
          if (event.currentTarget !== event.target) {
            return;
          }
          $self = $(event.target);
          if (!_this.itemActive) {
            _this.itemActive = $self;
            _this.setDefaultData();
          }
          if (_this.callbacks.over != null) {
            _this.callbacks.over($self, {
              itemActive: _this.itemActive,
              activeState: _this.activeState,
              sliding: _this.sliding,
              options: _this.options
            });
          }
          _this.sliding.css('opacity', 1);
          if (_this.options.direction === 'x') {
            animateOptions = {
              'left': $self.offset().left - _this.options.menu.offset().left,
              'width': $self.outerWidth()
            };
          } else if (_this.options.direction === 'y') {
            animateOptions = {
              'top': $self.offset().top - _this.options.menu.offset().top
            };
          } else {
            errorReport(_this.options.direction + " not support! Used x or y!");
          }
          return _this.sliding.stop().animate(animateOptions, {
            duration: _this.options.duration
          });
        };
      })(this));
    };

    SlidingMenu.prototype.setMouseLeave = function() {
      return this.options.menu.on('mouseleave', (function(_this) {
        return function(event) {
          var $self, animateOptions;
          $self = $(event.target);
          if (!_this.activeState) {
            _this.itemActive = null;
            _this.sliding.css({
              'opacity': 0,
              'left': 0,
              'with': 0
            });
            return;
          }
          if (_this.callbacks.leave != null) {
            _this.callbacks.leave($self, {
              itemActive: _this.itemActive,
              activeState: _this.activeState,
              sliding: _this.sliding,
              options: _this.options
            });
          }
          if (_this.options.direction === 'x') {
            animateOptions = {
              'left': _this.defaultData.left,
              'width': _this.defaultData.width
            };
          } else if (_this.options.direction === 'y') {
            animateOptions = {
              'top': _this.defaultData.top
            };
          } else {
            errorReport(_this.options.direction + " not support! Used x or y!");
          }
          return _this.sliding.stop().animate(animateOptions, {
            duration: _this.options.duration
          });
        };
      })(this));
    };

    errorReport = function(message) {
      return console.error(message);
    };

    return SlidingMenu;

  })();

}).call(this);

//# sourceMappingURL=SlidingMenu.js.map
