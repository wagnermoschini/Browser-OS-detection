/**
 *
 * browser - Browser and O.S. Detection
 *
 * @authors Wagner Moschini <wagnermoschini@gmail.com> and Eduardo Pacheco <du@kanema.com.br>
 *
 */
(function($) {

	$.fn.browser = function(options) {
	
		var	self = this,
			useragent = navigator.userAgent.toLowerCase() || "";
			opts = $.extend({}, $.fn.browser.defaults, options),
			properties = {
				engine: '',
				browser: '',
				os: '',
				version: $.browser.version
			};

		self.findByName = function(prop) {
			for (var i in prop) {
				if (prop[i].constructor !== String) {
					var object = self.findByName(prop[i]);
					if (object) {
						return object;
					};
				} else if ((new RegExp(prop[i], 'gi')).test(useragent)) {
					return prop[i];
				};
			};
		};
		
		properties.os = self.findByName(opts.plataforms);
		properties.engine = self.findByName(opts.engines);
		properties.browser = self.findByName(opts.browsers);
		properties.version = useragent.match(/((msie|firefox|chrome|version)(\/| ))([0-9.]*\.?[0-9.])/)[4];
		$(self).addClass(properties.browser.replace(" ","")+" "+properties.browser.replace(" ","")+parseInt(properties.version)+" "+properties.engine+" "+properties.os);
		
		return properties;
	};
	
	$.fn.browser.defaults = {
		
		plataforms : {
			'win': 'Windows',
			'mac': ['iPhone', 'iPad', 'Mac'],
			'linux': ['Android', 'Linux']
		},
		
		engines : {
			'presto': 'Presto',
			'webkit': 'WebKit',
			'gecko': 'Gecko',
			'trident': 'Trident'
		},
		
		browsers : {			
			'opera': ['Opera Mini', 'Opera'],
			'chrome': 'Chrome',
			'safari': 'Safari',
			'fennec': 'Firefox Mobile',
			'firefox': 'Firefox',
			'msie': 'Msie'
		}
	};
	
})(jQuery);