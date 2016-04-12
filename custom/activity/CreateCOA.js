Ext.define('Custom.activity.CreateCOA', {
	extend: 'Ext.form.Panel',
	alias: 'widget.createcoa',
	
	requires: ['Custom.extension.ProcessPowerpoint', 'Custom.extension.PowerPoint'],
	
	config: {
		workflow: null,
		workflowInstance: null,
		detailRecord: null,
		activityParameters: {}		
	},
	
	initComponent: function () {
		Ext.apply(this, {
			items: [{
				xtype: 'button',
				text: 'Create COA',
				scope: this,
				handler: this.onCreateCOAButtonClick
			}]
		});
		this.callParent();
	},
	
	onCreateCOAButtonClick: function () {
		var wfi = this.getWorkflowInstance(),
			wfTitle = wfi.get('Title'),
			title = 'COA File.pptx',
			outputPath = this.workflow.getWorkflowDocumentLibraryPath(),
			template = 'coas/IWMS_COA_Template.pptx';
			
								
		//Custom.extension.ProcessPowerpoint.readDocument(title, template, outputPath, Ext.bind(this.lookup, this));
		//Custom.extension.ProcessPowerpoint.createPresentationFromTemplate(title, outputPath, template);
		
		this.generatePowerPointTest(title, outputPath);
	
	},
	generatePowerPointTest: function (title, outputPath) { 		
		function generateExampleSlides(document) {
		  // Let's create a new slide:
		  var slide = document.addSlide(),
			pObj;

		  slide.name = 'The first slide!';

		  // Change the background color:
		  slide.background = '000000';

		  // Declare the default color to use on this slide:
		  slide.color = 'ffffff';

		  // Basic way to add text string:
		  slide.addText('Created version 1.0');
		  slide.addText('Fast position', 0, 20);
		  slide.addText('Full line', 0, 40, '100%', 20);

		  // Add text box with multi colors and fonts:
		  slide.addText([
			{ text: 'Hello ', options: { font_size: 56 } },
			{ text: 'World!', options: { font_size: 56, font_face: 'Arial', color: 'ffff00' } }
		  ], { cx: '75%', cy: 66, y: 150 });
		  // Please note that you can pass object as the text parameter to addText.

		  // For a single text just pass a text string to addText:
		  slide.addText('Office generator', { y: 66, x: 'c', cx: '50%', cy: 60, font_size: 48, color: '0000ff' });

		  pObj = slide.addText('Boom\nBoom!!!', { y: 100, x: 10, cx: '70%', font_face: 'Wide Latin', font_size: 54, color: 'cc0000', bold: true, underline: true });
		  pObj.options.y += 150;

		  // 2nd slide:
		  slide = document.addSlide();

		  // For every color property (including the back color property) you can pass object instead of the color string:
		  slide.background = { type: 'solid', color: '004400' };
		  pObj = slide.addText('Office generator', { y: 'c', x: 0, cx: '100%', cy: 66, font_size: 48, align: 'center', color: { type: 'solid', color: '008800' } });
		  pObj.setShadowEffect('outerShadow', { bottom: true, right: true });

		  slide = document.addSlide();

		  slide.show = false;
		  slide.addText('Red line', 'ff0000');
		  slide.addShape(document.self.shapes.OVAL, { fill: { type: 'solid', color: 'ff0000', alpha: 50 }, line: 'ffff00', y: 50, x: 50 });
		  slide.addText('Red box 1', { color: 'ffffff', fill: 'ff0000', line: 'ffff00', line_size: 5, y: 100, rotate: 45 });
		  slide.addShape(document.self.shapes.LINE, { line: '0000ff', y: 150, x: 150, cy: 0, cx: 300 });
		  slide.addShape(document.self.shapes.LINE, { line: '0000ff', y: 150, x: 150, cy: 100, cx: 0 });
		  slide.addShape(document.self.shapes.LINE, { line: '0000ff', y: 249, x: 150, cy: 0, cx: 300 });
		  slide.addShape(document.self.shapes.LINE, { line: '0000ff', y: 150, x: 449, cy: 100, cx: 0 });
		  slide.addShape(document.self.shapes.LINE, { line: '000088', y: 150, x: 150, cy: 100, cx: 300 });
		  slide.addShape(document.self.shapes.LINE, { line: '000088', y: 150, x: 150, cy: 100, cx: 300 });
		  slide.addShape(document.self.shapes.LINE, { line: '000088', y: 170, x: 150, cy: 100, cx: 300, line_head: 'triangle' });
		  slide.addShape(document.self.shapes.LINE, { line: '000088', y: 190, x: 150, cy: 100, cx: 300, line_tail: 'triangle' });
		  slide.addShape(document.self.shapes.LINE, { line: '000088', y: 210, x: 150, cy: 100, cx: 300, line_head: 'stealth', line_tail: 'stealth' });
		  pObj = slide.addShape(document.self.shapes.LINE);
		  pObj.options.line = '008888';
		  pObj.options.y = 210;
		  pObj.options.x = 150;
		  pObj.options.cy = 100;
		  pObj.options.cx = 300;
		  pObj.options.line_head = 'stealth';
		  pObj.options.line_tail = 'stealth';
		  pObj.options.flip_vertical = true;
		  slide.addText('Red box 2', { color: 'ffffff', fill: 'ff0000', line: 'ffff00', y: 350, x: 200, shape: document.self.shapes.ROUNDED_RECTANGLE, indentLevel: 1 });
		  

		}

		function generateTable(document) {
			var slide = document.makeNewSlide(),
				rows = [],
				i = 0,
				j = 0,
				row;
			for (i = 0; i < 12; i++) {
				row = [];
				for (var j = 0; j < 5; j++) {
					row.push("[" + i + "," + j + "]");
				}
				rows.push(row);
			}
			slide.addTable(rows, {});
		}		
		
		var powerpoint = Ext.create('Custom.extension.PowerPoint');
		
		
		generateExampleSlides(powerpoint);
		generateTable(powerpoint);
		powerpoint.generate().then(function (fileList) {
			Custom.extension.ProcessPowerpoint.saveDocumentFromObject(title, outputPath, fileList)
		});
	},
	
	lookup: function(tag) {
		// Need to replace this function content to lookup information in the workflow/currentdetailitem/workflowvariables/etc..
		var tags = {
			'RequestTitle': 'MyTitle',
			'RequestDescription': 'My Description',
			'RequestAuthor': 'Tim Roseberry',
			'RequestNeedBy': '1/1/2015',
			'RequestWorkCategory': 'Category',
			'RequestDirectedAuth': 'Directed Authority',
			'RequestACATLevel': '1C',
			'RequestProgram': 'WML Program',
			'RequestPrimaryDirectorate': 'Directorate',
			'RequestSupportDirectorate': 'Support'
		};
		if (tags[tag]) {
			return tags[tag];
		}
		return Ext.String.format('!!!! Error Tag: {0} not defined !!!!', lookup);		
	},
	processActivity: function (workflow, node, action) {		
		return true;
		/*
			if function cannot complete all activty and return true in a syncronous way then return false and then
			process all needed activity and then use the workflowManager context to reinvoke the transition of the task 
			
			workflowManager.processWorkflowTransition(nodeId, action);
		*/
	}
});