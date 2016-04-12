﻿Ext.define('Custom.extension.GenOfficeTable', {
	singleton: true,
	
	EMU: 914400,
	
	getTable: function(rows, options) {
		var options = options || {};

		if (options.columnWidth === undefined) {
		  options.columnWidth = 8 / (rows[0].length) * this.EMU
		}
		
		var self = this;
				
		return self._getBase(
			rows.map(function(row) {
			  return self._getRow(
				  row.map(function(cell) {
					return self._getCell(cell);
				  }),
				  options
			  );
			}),
			self._getColSpecs(rows, options),
			options
		)
	},
	
	_getBase: function (rowSpecs, colSpecs, options) {
		return {
		  "p:graphicFrame": {
			"p:nvGraphicFramePr": {
			  "p:cNvPr": {
				"@id": "6",
				"@name": "Table 5"
			  },
			  "p:cNvGraphicFramePr": {
				"a:graphicFrameLocks": {
				  "@noGrp": "1"
				}
			  },
			  "p:nvPr": {
				"p:extLst": {
				  "p:ext": {
					"@uri": "{D42A27DB-BD31-4B8C-83A1-F6EECF244321}",
					"p14:modId": {
					  "@xmlns:p14": "http://schemas.microsoft.com/office/powerpoint/2010/main",
					  "@val": "1579011935"
					}
				  }
				}
			  }
			},
			"p:xfrm": {
			  "a:off": {
				"@x": options.x || "1524000",
				"@y": options.y || "1397000"
			  },
			  "a:ext": {
				"@cx": options.cx || "6096000",
				"@cy": options.cy || "1483360"
			  }
			},
			"a:graphic": {
			  "a:graphicData": {
				"@uri": "http://schemas.openxmlformats.org/drawingml/2006/table",
				"a:tbl": {
				  "a:tblPr": {
					"@firstRow": "1",
					"@bandRow": "1",
					"a:tableStyleId": "{3C2FFA5D-87B4-456A-9821-1D502468CF0F}"
				  },
				  "a:tblGrid": {
					"#list": colSpecs
				  },

				  "#list": [rowSpecs]  // replace this with  an array of table row objects
				}
			  }
			}
		  }
		}
	},

	_getColSpecs: function(rows, options) {
		var self = this;
		return rows[0].map(function(val,idx) {
		  return self._tblGrid(options);
		})
	},

	_tblGrid: function(options) {
		return {
		  "a:gridCol": {
			"@w": options.columnWidth||"0" //|| "2048000"
		  }
		};
	},

	_getRow: function (cells, options) {
		return {
		  "a:tr": {
			"@h": options.rowHeight ||"0", //|| "370840",
			"#list": [cells] // populate this with an array of table cell objects
		  }
		}
	},
	_getCell: function (value, options) {
		return {
		  "a:tc": {
			"a:txBody": {
			  "a:bodyPr": {},
			  "a:lstStyle": {},

			  "a:p": {
				"a:r": {
				  "a:rPr": {
					"@lang": "en-US",
					"@dirty": "0",
					"@smtClean": "0"
				  },
				  "a:t": val  // this is the cell value
				},
				"a:endParaRPr": {
				  "@lang": "en-US",
				  "@dirty": "0"
				}
			  }
			},
			"a:tcPr": {}
		  }
		}		
	}


});