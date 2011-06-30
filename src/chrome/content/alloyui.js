FBL.ns(
	function() {
		with (FBL) {
			Firebug.alloyuiModel = extend(Firebug.Module, {});

			var NODELINK = this.NODELINK = A(
				{
					'class': 'objectLink objectLink-$className a11yFocus',
					_repObject: '$object._node'
				}
			);

			var OBJECTBOX = this.OBJECTBOX = SPAN(
				{
					'class': 'objectBox objectBox-$className'
				}
			);

			var OBJECTLINK = this.OBJECTLINK = A(
				{
					'class': 'objectLink objectLink-$className a11yFocus',
					_repObject: '$object'
				}
			);

			var dataDescriptor = function(name, data, tag) {
				var rep = {};

				rep[name] = data;

				return {
					data: data,
					name: name,
					rep: rep,
					tag: tag
				};
			};

			Firebug.alloyuiModel.NodeExpression = domplate(
				Firebug.Rep,
				{
					className: 'aui-expression',

					tag: OBJECTBOX(
						{},
						A(
							{
								'class': 'objectLink objectLink-aui-sign',
								_repObject: '$object'
							},
							'A.all'
						),
						SPAN(
							{
								'class': 'arrayLeftBracket'
							},
							'('
						),
						FOR(
							'item',
							'$object._nodes|arrayIterator',
							TAG(
								'$item.tag',
								{
									object: '$item.object'
								}
							),
							SPAN(
								{
									'class': 'arrayComma'
								},
								'$item.delim'
							)
						),
						SPAN(
							{
								'class': 'arrayRightBracket'
							},
							')'
						)
					),

					arrayIterator: function(array) {
						var items = [];

						var length = array.length;
						var lastIndex = length - 1;

						for (var i = 0; i < length; ++i) {
							var value = array[i];

							var rep = Firebug.getRep(value);

							var tag = rep.shortTag ? rep.shortTag : rep.tag;

							var delim = (i == lastIndex) ? '' : ', ';

							items.push(
								{
									delim: delim,
									object: value,
									tag: tag
								}
							);
						}

						return items;
					},

					getContextMenuItems: function(event) {
						return null;
					},

					getRealObject: function(object, context) {
						return object;
					},

					supportsObject: function(object) {
						return !!(object && object._nodes);
					}
				}
			);

			Firebug.alloyuiModel.NodeElement = domplate(
				FirebugReps.Element,
				{
					shortTag: SPAN(
						OBJECTLINK(
							SPAN(
								{
									'class': '$object|getVisible'
								},
								SPAN(
									{
										'class': 'selectorTag'
									},
									'$object|getSelectorTag'
								),
								SPAN(
									{
										'class': 'selectorId'
									},
									'$object|getSelectorId'
								),
								SPAN(
									{
										'class': 'selectorClass'
									},
									'$object|getSelectorClass'
								),
								SPAN(
									{
										'class': 'selectorValue'
									},
									'$object|getValue'
								)
							)
						 ),
						 A(
						 	{
						 		'class': 'objectLink objectLink-aui-data',
								onclick: '$onDataClick',
								_objData: '$object'
						 	},
							'&#9993;'
						 )
					),

					tag: OBJECTBOX(
						{},
						A(
							{
								'class': 'objectLink objectLink-aui-sign',
								_repObject: '$object'
							},
							'A.one'
						),
						SPAN(
							{
								'class': 'arrayLeftBracket'
							},
							'('
						),
						NODELINK(
							'&lt;',
							SPAN(
								{
									'class': 'nodeTag'
								},
								'$object._node.localName|toLowerCase'
							),
							FOR(
								'attr',
								'$object._node|attrIterator',
								'&nbsp;$attr.localName=&quot;',
								SPAN(
									{
										'class': 'nodeValue'
									},
									'$attr.nodeValue'
								),
								'&quot;'
							),
							'&gt;'
						 ),
						SPAN(
							{
								'class': 'arrayRightBracket'
							},
							')'
						)
					),

					dataIterator: function(object) {
						var retVal = [];

						var cache = object && object._data;

						if (cache) {
							for (var i in cache) {
								if (cache.hasOwnProperty(i)) {
									var value = cache[i];

									var rep = Firebug.getRep(value);

									var tag = rep.shortTag || rep.tag;

									retVal.push(
										dataDescriptor(i, value, tag)
									);
								}
							}
						}

						return retVal;
					},

					onDataClick: function(event) {
						var object = event.currentTarget.objData;
						var cache = object._data;

						if (cache) {
							var rep = Firebug.getRep(cache);

							rep.inspectObject(cache, FirebugContext);
						}
					},

					supportsObject: function(object, type) {
						return !!(object && object._node);
					}
				}
			);

			Firebug.registerModule(Firebug.alloyuiModel);

			Firebug.reps.splice(0, 0, Firebug.alloyuiModel.NodeExpression);
			Firebug.reps.splice(0, 0, Firebug.alloyuiModel.NodeElement);
			Firebug.reps.splice(0, 0, Firebug.alloyuiModel.NodeEvent);
		}
	}
);