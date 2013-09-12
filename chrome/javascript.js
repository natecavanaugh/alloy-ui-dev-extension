(function(argument) {
		var docElement = document.documentElement;
		var stamp = '__AUI_STAMPED__';

		if (document.getElementById(stamp)) {
			return;
		}

		var createAlloyVar = function() {
			var AUI = window.AUI || window.YUI;

			if (AUI && !window.A) {
				window.A = AUI().use('aui-base');
			}
		};

		var script = document.createElement('script');
		script.id = stamp;
		script.appendChild(document.createTextNode('('+ createAlloyVar +')();'));
		(document.body || document.head || document.documentElement).appendChild(script);
})();