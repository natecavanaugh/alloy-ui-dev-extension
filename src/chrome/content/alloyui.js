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
						var bracketClose, bracketOpen;

						for (var i = 0; i < length; ++i) {
							var value = array[i];

							var rep = Firebug.getRep(value);

							var tag = rep.shortTag ? rep.shortTag : rep.tag;

							var delim = (i == lastIndex) ? '' : ', ';

							bracketClose = bracketOpen = '';

							if (value && value.nodeType == 1) {
								bracketOpen = '<';
								bracketClose = '>';
							}

							items.push(
								{
									bracketClose: bracketClose,
									bracketOpen: bracketOpen,
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
				Firebug.alloyuiModel.NodeExpression,
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
						FOR(
							'item',
							'$object._node|nodeIterator',
							SPAN(
								{
									'class': 'bracketOpen'
								},
								'$item.bracketOpen'
							),
							TAG(
								'$item.tag',
								{
									object: '$item.object'
								}
							),
							SPAN(
								{
									'class': 'bracketClose'
								},
								'$item.bracketClose'
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

					nodeIterator: function(array) {
						return this.arrayIterator([array]);
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