Ext.define('Custom.extension.PowerPoint', {
    extend: 'Custom.extension.OfficeDocument',
	requires: ['Custom.xmlbuilder.XMLBuilder'],
	
    statics: {
        fields: {
            // presentation slide number:
            'SLIDE_NUM': 'slidenum',
            // default date time format for the rendering application:
            'DATE_TIME': 'datetime',
            // MM/DD/YYYY date time format (Example: 10/12/2007):
            'DATE_MM_DD_YYYY': 'datetime1',
            // Day, Month DD, YYYY date time format (Example: Friday, October 12, 2007):
            'DATE_WD_MN_DD_YYYY': 'datetime2',
            // DD Month YYYY date time format (Example: 12 October 2007):
            'DATE_DD_MN_YYYY': 'datetime3',
            // Month DD, YYYY date time format (Example: October 12, 2007):
            'DATE_MN_DD_YYYY': 'datetime4',
            // DD-Mon-YY date time format (Example: 12-Oct-07):
            'DATE_DD_SMN_YY': 'datetime5',
            // Month YY date time format (Example: October 07):
            'DATE_MM_YY': 'datetime6',
            // Mon-YY date time format (Example: Oct-07):
            'DATE_SMN_YY': 'datetime7',
            // MM/DD/YYYY hh:mm AM/PM date time format (Example: 10/12/2007 4:28 PM):
            'DATE_TIME_DD_MM_YYYY_HH_MM_PM': 'datetime8',
            // MM/DD/YYYY hh:mm:ss AM/PM date time format (Example: 10/12/2007 4:28:34 PM):
            'DATE_TIME_DD_MM_YYYY_HH_MM_SC_PM': 'datetime9',
            // hh:mm date time format (Example: 16:28):
            'TIME_HH_MM': 'datetime10',
            // hh:mm:ss date time format (Example: 16:28:34):
            'TIME_HH_MM_SC': 'datetime11',
            // hh:mm AM/PM date time format (Example: 4:28 PM):
            'TIME_HH_MM_PM': 'datetime12',
            // hh:mm:ss: AM/PM date time format (Example: 4:28:34 PM):
            'TIME_HH_MM_SC_PM': 'datetime13'
        },
        shapes: {
            ACTION_BUTTON_BACK_OR_PREVIOUS: {
                'displayName': 'Action Button: Back or Previous',
                'name': 'actionButtonBackPrevious',
                'avLst': {}
            },
            ACTION_BUTTON_BEGINNING: {
                'displayName': 'Action Button: Beginning',
                'name': 'actionButtonBeginning',
                'avLst': {}
            },
            ACTION_BUTTON_CUSTOM: {
                'displayName': 'Action Button: Custom',
                'name': 'actionButtonBlank',
                'avLst': {}
            },
            ACTION_BUTTON_DOCUMENT: {
                'displayName': 'Action Button: Document',
                'name': 'actionButtonDocument',
                'avLst': {}
            },
            ACTION_BUTTON_END: {
                'displayName': 'Action Button: End',
                'name': 'actionButtonEnd',
                'avLst': {}
            },
            ACTION_BUTTON_FORWARD_OR_NEXT: {
                'displayName': 'Action Button: Forward or Next',
                'name': 'actionButtonForwardNext',
                'avLst': {}
            },
            ACTION_BUTTON_HELP: {
                'displayName': 'Action Button: Help',
                'name': 'actionButtonHelp',
                'avLst': {}
            },
            ACTION_BUTTON_HOME: {
                'displayName': 'Action Button: Home',
                'name': 'actionButtonHome',
                'avLst': {}
            },
            ACTION_BUTTON_INFORMATION: {
                'displayName': 'Action Button: Information',
                'name': 'actionButtonInformation',
                'avLst': {}
            },
            ACTION_BUTTON_MOVIE: {
                'displayName': 'Action Button: Movie',
                'name': 'actionButtonMovie',
                'avLst': {}
            },
            ACTION_BUTTON_RETURN: {
                'displayName': 'Action Button: Return',
                'name': 'actionButtonReturn',
                'avLst': {}
            },
            ACTION_BUTTON_SOUND: {
                'displayName': 'Action Button: Sound',
                'name': 'actionButtonSound',
                'avLst': {}
            },
            ARC: {
                'displayName': 'Arc',
                'name': 'arc',
                'avLst': {
                    'adj1': 16200000,
                    'adj2': 0
                }
            },
            BALLOON: {
                'displayName': 'Rounded Rectangular Callout',
                'name': 'wedgeRoundRectCallout',
                'avLst': {
                    'adj1': -20833,
                    'adj2': 62500,
                    'adj3': 16667
                }
            },
            BENT_ARROW: {
                'displayName': 'Bent Arrow',
                'name': 'bentArrow',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000,
                    'adj3': 25000,
                    'adj4': 43750
                }
            },
            BENT_UP_ARROW: {
                'displayName': 'Bent-Up Arrow',
                'name': 'bentUpArrow',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000,
                    'adj3': 25000
                }
            },
            BEVEL: {
                'displayName': 'Bevel',
                'name': 'bevel',
                'avLst': {
                    'adj': 12500
                }
            },
            BLOCK_ARC: {
                'displayName': 'Block Arc',
                'name': 'blockArc',
                'avLst': {
                    'adj1': 10800000,
                    'adj2': 0,
                    'adj3': 25000
                }
            },
            CAN: {
                'displayName': 'Can',
                'name': 'can',
                'avLst': {
                    'adj': 25000
                }
            },
            CHART_PLUS: {
                'displayName': 'Chart Plus',
                'name': 'chartPlus',
                'avLst': {}
            },
            CHART_STAR: {
                'displayName': 'Chart Star',
                'name': 'chartStar',
                'avLst': {}
            },
            CHART_X: {
                'displayName': 'Chart X',
                'name': 'chartX',
                'avLst': {}
            },
            CHEVRON: {
                'displayName': 'Chevron',
                'name': 'chevron',
                'avLst': {
                    'adj': 50000
                }
            },
            CHORD: {
                'displayName': 'Chord',
                'name': 'chord',
                'avLst': {
                    'adj1': 2700000,
                    'adj2': 16200000
                }
            },
            CIRCULAR_ARROW: {
                'displayName': 'Circular Arrow',
                'name': 'circularArrow',
                'avLst': {
                    'adj1': 12500,
                    'adj2': 1142319,
                    'adj3': 20457681,
                    'adj4': 10800000,
                    'adj5': 12500
                }
            },
            CLOUD: {
                'displayName': 'Cloud',
                'name': 'cloud',
                'avLst': {}
            },
            CLOUD_CALLOUT: {
                'displayName': 'Cloud Callout',
                'name': 'cloudCallout',
                'avLst': {
                    'adj1': -20833,
                    'adj2': 62500
                }
            },
            CORNER: {
                'displayName': 'Corner',
                'name': 'corner',
                'avLst': {
                    'adj1': 50000,
                    'adj2': 50000
                }
            },
            CORNER_TABS: {
                'displayName': 'Corner Tabs',
                'name': 'cornerTabs',
                'avLst': {}
            },
            CROSS: {
                'displayName': 'Cross',
                'name': 'plus',
                'avLst': {
                    'adj': 25000
                }
            },
            CUBE: {
                'displayName': 'Cube',
                'name': 'cube',
                'avLst': {
                    'adj': 25000
                }
            },
            CURVED_DOWN_ARROW: {
                'displayName': 'Curved Down Arrow',
                'name': 'curvedDownArrow',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 50000,
                    'adj3': 25000
                }
            },
            CURVED_DOWN_RIBBON: {
                'displayName': 'Curved Down Ribbon',
                'name': 'ellipseRibbon',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 50000,
                    'adj3': 12500
                }
            },
            CURVED_LEFT_ARROW: {
                'displayName': 'Curved Left Arrow',
                'name': 'curvedLeftArrow',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 50000,
                    'adj3': 25000
                }
            },
            CURVED_RIGHT_ARROW: {
                'displayName': 'Curved Right Arrow',
                'name': 'curvedRightArrow',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 50000,
                    'adj3': 25000
                }
            },
            CURVED_UP_ARROW: {
                'displayName': 'Curved Up Arrow',
                'name': 'curvedUpArrow',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 50000,
                    'adj3': 25000
                }
            },
            CURVED_UP_RIBBON: {
                'displayName': 'Curved Up Ribbon',
                'name': 'ellipseRibbon2',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 50000,
                    'adj3': 12500
                }
            },
            DECAGON: {
                'displayName': 'Decagon',
                'name': 'decagon',
                'avLst': {
                    'vf': 105146
                }
            },
            DIAGONAL_STRIPE: {
                'displayName': 'Diagonal Stripe',
                'name': 'diagStripe',
                'avLst': {
                    'adj': 50000
                }
            },
            DIAMOND: {
                'displayName': 'Diamond',
                'name': 'diamond',
                'avLst': {}
            },
            DODECAGON: {
                'displayName': 'Dodecagon',
                'name': 'dodecagon',
                'avLst': {}
            },
            DONUT: {
                'displayName': 'Donut',
                'name': 'donut',
                'avLst': {
                    'adj': 25000
                }
            },
            DOUBLE_BRACE: {
                'displayName': 'Double Brace',
                'name': 'bracePair',
                'avLst': {
                    'adj': 8333
                }
            },
            DOUBLE_BRACKET: {
                'displayName': 'Double Bracket',
                'name': 'bracketPair',
                'avLst': {
                    'adj': 16667
                }
            },
            DOUBLE_WAVE: {
                'displayName': 'Double Wave',
                'name': 'doubleWave',
                'avLst': {
                    'adj1': 6250,
                    'adj2': 0
                }
            },
            DOWN_ARROW: {
                'displayName': 'Down Arrow',
                'name': 'downArrow',
                'avLst': {
                    'adj1': 50000,
                    'adj2': 50000
                }
            },
            DOWN_ARROW_CALLOUT: {
                'displayName': 'Down Arrow Callout',
                'name': 'downArrowCallout',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000,
                    'adj3': 25000,
                    'adj4': 64977
                }
            },
            DOWN_RIBBON: {
                'displayName': 'Down Ribbon',
                'name': 'ribbon',
                'avLst': {
                    'adj1': 16667,
                    'adj2': 50000
                }
            },
            EXPLOSION1: {
                'displayName': 'Explosion',
                'name': 'irregularSeal1',
                'avLst': {}
            },
            EXPLOSION2: {
                'displayName': 'Explosion',
                'name': 'irregularSeal2',
                'avLst': {}
            },
            FLOWCHART_ALTERNATE_PROCESS: {
                'displayName': 'Alternate process',
                'name': 'flowChartAlternateProcess',
                'avLst': {}
            },
            FLOWCHART_CARD: {
                'displayName': 'Card',
                'name': 'flowChartPunchedCard',
                'avLst': {}
            },
            FLOWCHART_COLLATE: {
                'displayName': 'Collate',
                'name': 'flowChartCollate',
                'avLst': {}
            },
            FLOWCHART_CONNECTOR: {
                'displayName': 'Connector',
                'name': 'flowChartConnector',
                'avLst': {}
            },
            FLOWCHART_DATA: {
                'displayName': 'Data',
                'name': 'flowChartInputOutput',
                'avLst': {}
            },
            FLOWCHART_DECISION: {
                'displayName': 'Decision',
                'name': 'flowChartDecision',
                'avLst': {}
            },
            FLOWCHART_DELAY: {
                'displayName': 'Delay',
                'name': 'flowChartDelay',
                'avLst': {}
            },
            FLOWCHART_DIRECT_ACCESS_STORAGE: {
                'displayName': 'Direct Access Storage',
                'name': 'flowChartMagneticDrum',
                'avLst': {}
            },
            FLOWCHART_DISPLAY: {
                'displayName': 'Display',
                'name': 'flowChartDisplay',
                'avLst': {}
            },
            FLOWCHART_DOCUMENT: {
                'displayName': 'Document',
                'name': 'flowChartDocument',
                'avLst': {}
            },
            FLOWCHART_EXTRACT: {
                'displayName': 'Extract',
                'name': 'flowChartExtract',
                'avLst': {}
            },
            FLOWCHART_INTERNAL_STORAGE: {
                'displayName': 'Internal Storage',
                'name': 'flowChartInternalStorage',
                'avLst': {}
            },
            FLOWCHART_MAGNETIC_DISK: {
                'displayName': 'Magnetic Disk',
                'name': 'flowChartMagneticDisk',
                'avLst': {}
            },
            FLOWCHART_MANUAL_INPUT: {
                'displayName': 'Manual Input',
                'name': 'flowChartManualInput',
                'avLst': {}
            },
            FLOWCHART_MANUAL_OPERATION: {
                'displayName': 'Manual Operation',
                'name': 'flowChartManualOperation',
                'avLst': {}
            },
            FLOWCHART_MERGE: {
                'displayName': 'Merge',
                'name': 'flowChartMerge',
                'avLst': {}
            },
            FLOWCHART_MULTIDOCUMENT: {
                'displayName': 'Multidocument',
                'name': 'flowChartMultidocument',
                'avLst': {}
            },
            FLOWCHART_OFFLINE_STORAGE: {
                'displayName': 'Offline Storage',
                'name': 'flowChartOfflineStorage',
                'avLst': {}
            },
            FLOWCHART_OFFPAGE_CONNECTOR: {
                'displayName': 'Off-page Connector',
                'name': 'flowChartOffpageConnector',
                'avLst': {}
            },
            FLOWCHART_OR: {
                'displayName': 'Or',
                'name': 'flowChartOr',
                'avLst': {}
            },
            FLOWCHART_PREDEFINED_PROCESS: {
                'displayName': 'Predefined Process',
                'name': 'flowChartPredefinedProcess',
                'avLst': {}
            },
            FLOWCHART_PREPARATION: {
                'displayName': 'Preparation',
                'name': 'flowChartPreparation',
                'avLst': {}
            },
            FLOWCHART_PROCESS: {
                'displayName': 'Process',
                'name': 'flowChartProcess',
                'avLst': {}
            },
            FLOWCHART_PUNCHED_TAPE: {
                'displayName': 'Punched Tape',
                'name': 'flowChartPunchedTape',
                'avLst': {}
            },
            FLOWCHART_SEQUENTIAL_ACCESS_STORAGE: {
                'displayName': 'Sequential Access Storage',
                'name': 'flowChartMagneticTape',
                'avLst': {}
            },
            FLOWCHART_SORT: {
                'displayName': 'Sort',
                'name': 'flowChartSort',
                'avLst': {}
            },
            FLOWCHART_STORED_DATA: {
                'displayName': 'Stored Data',
                'name': 'flowChartOnlineStorage',
                'avLst': {}
            },
            FLOWCHART_SUMMING_JUNCTION: {
                'displayName': 'Summing Junction',
                'name': 'flowChartSummingJunction',
                'avLst': {}
            },
            FLOWCHART_TERMINATOR: {
                'displayName': 'Terminator',
                'name': 'flowChartTerminator',
                'avLst': {}
            },
            FOLDED_CORNER: {
                'displayName': 'Folded Corner',
                'name': 'folderCorner',
                'avLst': {}
            },
            FRAME: {
                'displayName': 'Frame',
                'name': 'frame',
                'avLst': {
                    'adj1': 12500
                }
            },
            FUNNEL: {
                'displayName': 'Funnel',
                'name': 'funnel',
                'avLst': {}
            },
            GEAR_6: {
                'displayName': 'Gear 6',
                'name': 'gear6',
                'avLst': {
                    'adj1': 15000,
                    'adj2': 3526
                }
            },
            GEAR_9: {
                'displayName': 'Gear 9',
                'name': 'gear9',
                'avLst': {
                    'adj1': 10000,
                    'adj2': 1763
                }
            },
            HALF_FRAME: {
                'displayName': 'Half Frame',
                'name': 'halfFrame',
                'avLst': {
                    'adj1': 33333,
                    'adj2': 33333
                }
            },
            HEART: {
                'displayName': 'Heart',
                'name': 'heart',
                'avLst': {}
            },
            HEPTAGON: {
                'displayName': 'Heptagon',
                'name': 'heptagon',
                'avLst': {
                    'hf': 102572,
                    'vf': 105210
                }
            },
            HEXAGON: {
                'displayName': 'Hexagon',
                'name': 'hexagon',
                'avLst': {
                    'adj': 25000,
                    'vf': 115470
                }
            },
            HORIZONTAL_SCROLL: {
                'displayName': 'Horizontal Scroll',
                'name': 'horizontalScroll',
                'avLst': {
                    'adj': 12500
                }
            },
            ISOSCELES_TRIANGLE: {
                'displayName': 'Isosceles Triangle',
                'name': 'triangle',
                'avLst': {
                    'adj': 50000
                }
            },
            LEFT_ARROW: {
                'displayName': 'Left Arrow',
                'name': 'leftArrow',
                'avLst': {
                    'adj1': 50000,
                    'adj2': 50000
                }
            },
            LEFT_ARROW_CALLOUT: {
                'displayName': 'Left Arrow Callout',
                'name': 'leftArrowCallout',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000,
                    'adj3': 25000,
                    'adj4': 64977
                }
            },
            LEFT_BRACE: {
                'displayName': 'Left Brace',
                'name': 'leftBrace',
                'avLst': {
                    'adj1': 8333,
                    'adj2': 50000
                }
            },
            LEFT_BRACKET: {
                'displayName': 'Left Bracket',
                'name': 'leftBracket',
                'avLst': {
                    'adj': 8333
                }
            },
            LEFT_CIRCULAR_ARROW: {
                'displayName': 'Left Circular Arrow',
                'name': 'leftCircularArrow',
                'avLst': {
                    'adj1': 12500,
                    'adj2': -1142319,
                    'adj3': 1142319,
                    'adj4': 10800000,
                    'adj5': 12500
                }
            },
            LEFT_RIGHT_ARROW: {
                'displayName': 'Left-Right Arrow',
                'name': 'leftRightArrow',
                'avLst': {
                    'adj1': 50000,
                    'adj2': 50000
                }
            },
            LEFT_RIGHT_ARROW_CALLOUT: {
                'displayName': 'Left-Right Arrow Callout',
                'name': 'leftRightArrowCallout',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000,
                    'adj3': 25000,
                    'adj4': 48123
                }
            },
            LEFT_RIGHT_CIRCULAR_ARROW: {
                'displayName': 'Left Right Circular Arrow',
                'name': 'leftRightCircularArrow',
                'avLst': {
                    'adj1': 12500,
                    'adj2': 1142319,
                    'adj3': 20457681,
                    'adj4': 11942319,
                    'adj5': 12500
                }
            },
            LEFT_RIGHT_RIBBON: {
                'displayName': 'Left Right Ribbon',
                'name': 'leftRightRibbon',
                'avLst': {
                    'adj1': 50000,
                    'adj2': 50000,
                    'adj3': 16667
                }
            },
            LEFT_RIGHT_UP_ARROW: {
                'displayName': 'Left-Right-Up Arrow',
                'name': 'leftRightUpArrow',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000,
                    'adj3': 25000
                }
            },
            LEFT_UP_ARROW: {
                'displayName': 'Left-Up Arrow',
                'name': 'leftUpArrow',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000,
                    'adj3': 25000
                }
            },
            LIGHTNING_BOLT: {
                'displayName': 'Lightning Bolt',
                'name': 'lightningBolt',
                'avLst': {}
            },
            LINE_CALLOUT_1: {
                'displayName': 'Line Callout 1',
                'name': 'borderCallout1',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 112500,
                    'adj4': -38333
                }
            },
            LINE_CALLOUT_1_ACCENT_BAR: {
                'displayName': 'Line Callout 1 {Accent Bar}',
                'name': 'accentCallout1',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 112500,
                    'adj4': -38333
                }
            },
            LINE_CALLOUT_1_BORDER_AND_ACCENT_BAR: {
                'displayName': 'Line Callout 1 {Border and Accent Bar}',
                'name': 'accentBorderCallout1',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 112500,
                    'adj4': -38333
                }
            },
            LINE_CALLOUT_1_NO_BORDER: {
                'displayName': 'Line Callout 1 {No Border}',
                'name': 'callout1',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 112500,
                    'adj4': -38333
                }
            },
            LINE_CALLOUT_2: {
                'displayName': 'Line Callout 2',
                'name': 'borderCallout2',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 112500,
                    'adj6': -46667
                }
            },
            LINE_CALLOUT_2_ACCENT_BAR: {
                'displayName': 'Line Callout 2 {Accent Bar}',
                'name': 'accentCallout2',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 112500,
                    'adj6': -46667
                }
            },
            LINE_CALLOUT_2_BORDER_AND_ACCENT_BAR: {
                'displayName': 'Line Callout 2 {Border and Accent Bar}',
                'name': 'accentBorderCallout2',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 112500,
                    'adj6': -46667
                }
            },
            LINE_CALLOUT_2_NO_BORDER: {
                'displayName': 'Line Callout 2 {No Border}',
                'name': 'callout2',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 112500,
                    'adj6': -46667
                }
            },
            LINE_CALLOUT_3: {
                'displayName': 'Line Callout 3',
                'name': 'borderCallout3',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 100000,
                    'adj6': -16667,
                    'adj7': 112963,
                    'adj8': -8333
                }
            },
            LINE_CALLOUT_3_ACCENT_BAR: {
                'displayName': 'Line Callout 3 {Accent Bar}',
                'name': 'accentCallout3',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 100000,
                    'adj6': -16667,
                    'adj7': 112963,
                    'adj8': -8333
                }
            },
            LINE_CALLOUT_3_BORDER_AND_ACCENT_BAR: {
                'displayName': 'Line Callout 3 {Border and Accent Bar}',
                'name': 'accentBorderCallout3',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 100000,
                    'adj6': -16667,
                    'adj7': 112963,
                    'adj8': -8333
                }
            },
            LINE_CALLOUT_3_NO_BORDER: {
                'displayName': 'Line Callout 3 {No Border}',
                'name': 'callout3',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 100000,
                    'adj6': -16667,
                    'adj7': 112963,
                    'adj8': -8333
                }
            },
            LINE_CALLOUT_4: {
                'displayName': 'Line Callout 3',
                'name': 'borderCallout3',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 100000,
                    'adj6': -16667,
                    'adj7': 112963,
                    'adj8': -8333
                }
            },
            LINE_CALLOUT_4_ACCENT_BAR: {
                'displayName': 'Line Callout 3 {Accent Bar}',
                'name': 'accentCallout3',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 100000,
                    'adj6': -16667,
                    'adj7': 112963,
                    'adj8': -8333
                }
            },
            LINE_CALLOUT_4_BORDER_AND_ACCENT_BAR: {
                'displayName': 'Line Callout 3 {Border and Accent Bar}',
                'name': 'accentBorderCallout3',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 100000,
                    'adj6': -16667,
                    'adj7': 112963,
                    'adj8': -8333
                }
            },
            LINE_CALLOUT_4_NO_BORDER: {
                'displayName': 'Line Callout 3 {No Border}',
                'name': 'callout3',
                'avLst': {
                    'adj1': 18750,
                    'adj2': -8333,
                    'adj3': 18750,
                    'adj4': -16667,
                    'adj5': 100000,
                    'adj6': -16667,
                    'adj7': 112963,
                    'adj8': -8333
                }
            },
            LINE: {
                'displayName': 'Line',
                'name': 'line',
                'avLst': {}
            },
            LINE_INVERSE: {
                'displayName': 'Straight Connector',
                'name': 'lineInv',
                'avLst': {}
            },
            MATH_DIVIDE: {
                'displayName': 'Division',
                'name': 'mathDivide',
                'avLst': {
                    'adj1': 23520,
                    'adj2': 5880,
                    'adj3': 11760
                }
            },
            MATH_EQUAL: {
                'displayName': 'Equal',
                'name': 'mathEqual',
                'avLst': {
                    'adj1': 23520,
                    'adj2': 11760
                }
            },
            MATH_MINUS: {
                'displayName': 'Minus',
                'name': 'mathMinus',
                'avLst': {
                    'adj1': 23520
                }
            },
            MATH_MULTIPLY: {
                'displayName': 'Multiply',
                'name': 'mathMultiply',
                'avLst': {
                    'adj1': 23520
                }
            },
            MATH_NOT_EQUAL: {
                'displayName': 'Not Equal',
                'name': 'mathNotEqual',
                'avLst': {
                    'adj1': 23520,
                    'adj2': 6600000,
                    'adj3': 11760
                }
            },
            MATH_PLUS: {
                'displayName': 'Plus',
                'name': 'mathPlus',
                'avLst': {
                    'adj1': 23520
                }
            },
            MOON: {
                'displayName': 'Moon',
                'name': 'moon',
                'avLst': {
                    'adj': 50000
                }
            },
            NON_ISOSCELES_TRAPEZOID: {
                'displayName': 'Non-isosceles Trapezoid',
                'name': 'nonIsoscelesTrapezoid',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000
                }
            },
            NOTCHED_RIGHT_ARROW: {
                'displayName': 'Notched Right Arrow',
                'name': 'notchedRightArrow',
                'avLst': {
                    'adj1': 50000,
                    'adj2': 50000
                }
            },
            NO_SYMBOL: {
                'displayName': '"No" symbol',
                'name': 'noSmoking',
                'avLst': {
                    'adj': 18750
                }
            },
            OCTAGON: {
                'displayName': 'Octagon',
                'name': 'octagon',
                'avLst': {
                    'adj': 29289
                }
            },
            OVAL: {
                'displayName': 'Oval',
                'name': 'ellipse',
                'avLst': {}
            },
            OVAL_CALLOUT: {
                'displayName': 'Oval Callout',
                'name': 'wedgeEllipseCallout',
                'avLst': {
                    'adj1': -20833,
                    'adj2': 62500
                }
            },
            PARALLELOGRAM: {
                'displayName': 'Parallelogram',
                'name': 'parallelogram',
                'avLst': {
                    'adj': 25000
                }
            },
            PENTAGON: {
                'displayName': 'Pentagon',
                'name': 'homePlate',
                'avLst': {
                    'adj': 50000
                }
            },
            PIE: {
                'displayName': 'Pie',
                'name': 'pie',
                'avLst': {
                    'adj1': 0,
                    'adj2': 16200000
                }
            },
            PIE_WEDGE: {
                'displayName': 'Pie',
                'name': 'pieWedge',
                'avLst': {}
            },
            PLAQUE: {
                'displayName': 'Plaque',
                'name': 'plaque',
                'avLst': {
                    'adj': 16667
                }
            },
            PLAQUE_TABS: {
                'displayName': 'Plaque Tabs',
                'name': 'plaqueTabs',
                'avLst': {}
            },
            QUAD_ARROW: {
                'displayName': 'Quad Arrow',
                'name': 'quadArrow',
                'avLst': {
                    'adj1': 22500,
                    'adj2': 22500,
                    'adj3': 22500
                }
            },
            QUAD_ARROW_CALLOUT: {
                'displayName': 'Quad Arrow Callout',
                'name': 'quadArrowCallout',
                'avLst': {
                    'adj1': 18515,
                    'adj2': 18515,
                    'adj3': 18515,
                    'adj4': 48123
                }
            },
            RECTANGLE: {
                'displayName': 'Rectangle',
                'name': 'rect',
                'avLst': {}
            },
            RECTANGULAR_CALLOUT: {
                'displayName': 'Rectangular Callout',
                'name': 'wedgeRectCallout',
                'avLst': {
                    'adj1': -20833,
                    'adj2': 62500
                }
            },
            REGULAR_PENTAGON: {
                'displayName': 'Regular Pentagon',
                'name': 'pentagon',
                'avLst': {
                    'hf': 105146,
                    'vf': 110557
                }
            },
            RIGHT_ARROW: {
                'displayName': 'Right Arrow',
                'name': 'rightArrow',
                'avLst': {
                    'adj1': 50000,
                    'adj2': 50000
                }
            },
            RIGHT_ARROW_CALLOUT: {
                'displayName': 'Right Arrow Callout',
                'name': 'rightArrowCallout',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000,
                    'adj3': 25000,
                    'adj4': 64977
                }
            },
            RIGHT_BRACE: {
                'displayName': 'Right Brace',
                'name': 'rightBrace',
                'avLst': {
                    'adj1': 8333,
                    'adj2': 50000
                }
            },
            RIGHT_BRACKET: {
                'displayName': 'Right Bracket',
                'name': 'rightBracket',
                'avLst': {
                    'adj': 8333
                }
            },
            RIGHT_TRIANGLE: {
                'displayName': 'Right Triangle',
                'name': 'rtTriangle',
                'avLst': {}
            },
            ROUNDED_RECTANGLE: {
                'displayName': 'Rounded Rectangle',
                'name': 'roundRect',
                'avLst': {
                    'adj': 16667
                }
            },
            ROUNDED_RECTANGULAR_CALLOUT: {
                'displayName': 'Rounded Rectangular Callout',
                'name': 'wedgeRoundRectCallout',
                'avLst': {
                    'adj1': -20833,
                    'adj2': 62500,
                    'adj3': 16667
                }
            },
            ROUND_1_RECTANGLE: {
                'displayName': 'Round Single Corner Rectangle',
                'name': 'round1Rect',
                'avLst': {
                    'adj': 16667
                }
            },
            ROUND_2_DIAG_RECTANGLE: {
                'displayName': 'Round Diagonal Corner Rectangle',
                'name': 'round2DiagRect',
                'avLst': {
                    'adj1': 16667,
                    'adj2': 0
                }
            },
            ROUND_2_SAME_RECTANGLE: {
                'displayName': 'Round Same Side Corner Rectangle',
                'name': 'round2SameRect',
                'avLst': {
                    'adj1': 16667,
                    'adj2': 0
                }
            },
            SMILEY_FACE: {
                'displayName': 'Smiley Face',
                'name': 'smileyFace',
                'avLst': {
                    'adj': 4653
                }
            },
            SNIP_1_RECTANGLE: {
                'displayName': 'Snip Single Corner Rectangle',
                'name': 'snip1Rect',
                'avLst': {
                    'adj': 16667
                }
            },
            SNIP_2_DIAG_RECTANGLE: {
                'displayName': 'Snip Diagonal Corner Rectangle',
                'name': 'snip2DiagRect',
                'avLst': {
                    'adj1': 0,
                    'adj2': 16667
                }
            },
            SNIP_2_SAME_RECTANGLE: {
                'displayName': 'Snip Same Side Corner Rectangle',
                'name': 'snip2SameRect',
                'avLst': {
                    'adj1': 16667,
                    'adj2': 0
                }
            },
            SNIP_ROUND_RECTANGLE: {
                'displayName': 'Snip and Round Single Corner Rectangle',
                'name': 'snipRoundRect',
                'avLst': {
                    'adj1': 16667,
                    'adj2': 16667
                }
            },
            SQUARE_TABS: {
                'displayName': 'Square Tabs',
                'name': 'squareTabs',
                'avLst': {}
            },
            STAR_10_POINT: {
                'displayName': '10-Point Star',
                'name': 'star10',
                'avLst': {
                    'adj': 42533,
                    'hf': 105146
                }
            },
            STAR_12_POINT: {
                'displayName': '12-Point Star',
                'name': 'star12',
                'avLst': {
                    'adj': 37500
                }
            },
            STAR_16_POINT: {
                'displayName': '16-Point Star',
                'name': 'star16',
                'avLst': {
                    'adj': 37500
                }
            },
            STAR_24_POINT: {
                'displayName': '24-Point Star',
                'name': 'star24',
                'avLst': {
                    'adj': 37500
                }
            },
            STAR_32_POINT: {
                'displayName': '32-Point Star',
                'name': 'star32',
                'avLst': {
                    'adj': 37500
                }
            },
            STAR_4_POINT: {
                'displayName': '4-Point Star',
                'name': 'star4',
                'avLst': {
                    'adj': 12500
                }
            },
            STAR_5_POINT: {
                'displayName': '5-Point Star',
                'name': 'star5',
                'avLst': {
                    'adj': 19098,
                    'hf': 105146,
                    'vf': 110557
                }
            },
            STAR_6_POINT: {
                'displayName': '6-Point Star',
                'name': 'star6',
                'avLst': {
                    'adj': 28868,
                    'hf': 115470
                }
            },
            STAR_7_POINT: {
                'displayName': '7-Point Star',
                'name': 'star7',
                'avLst': {
                    'adj': 34601,
                    'hf': 102572,
                    'vf': 105210
                }
            },
            STAR_8_POINT: {
                'displayName': '8-Point Star',
                'name': 'star8',
                'avLst': {
                    'adj': 37500
                }
            },
            STRIPED_RIGHT_ARROW: {
                'displayName': 'Striped Right Arrow',
                'name': 'stripedRightArrow',
                'avLst': {
                    'adj1': 50000,
                    'adj2': 50000
                }
            },
            SUN: {
                'displayName': 'Sun',
                'name': 'sun',
                'avLst': {
                    'adj': 25000
                }
            },
            SWOOSH_ARROW: {
                'displayName': 'Swoosh Arrow',
                'name': 'swooshArrow',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 16667
                }
            },
            TEAR: {
                'displayName': 'Teardrop',
                'name': 'teardrop',
                'avLst': {
                    'adj': 100000
                }
            },
            TRAPEZOID: {
                'displayName': 'Trapezoid',
                'name': 'trapezoid',
                'avLst': {
                    'adj': 25000
                }
            },
            UP_ARROW: {
                'displayName': 'Up Arrow',
                'name': 'upArrow',
                'avLst': {}
            },
            UP_ARROW_CALLOUT: {
                'displayName': 'Up Arrow Callout',
                'name': 'upArrowCallout',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000,
                    'adj3': 25000,
                    'adj4': 64977
                }
            },
            UP_DOWN_ARROW: {
                'displayName': 'Up-Down Arrow',
                'name': 'upDownArrow',
                'avLst': {
                    'adj1': 50000,
                    'adj1': 50000,
                    'adj2': 50000,
                    'adj2': 50000
                }
            },
            UP_DOWN_ARROW_CALLOUT: {
                'displayName': 'Up-Down Arrow Callout',
                'name': 'upDownArrowCallout',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000,
                    'adj3': 25000,
                    'adj4': 48123
                }
            },
            UP_RIBBON: {
                'displayName': 'Up Ribbon',
                'name': 'ribbon2',
                'avLst': {
                    'adj1': 16667,
                    'adj2': 50000
                }
            },
            U_TURN_ARROW: {
                'displayName': 'U-Turn Arrow',
                'name': 'uturnArrow',
                'avLst': {
                    'adj1': 25000,
                    'adj2': 25000,
                    'adj3': 25000,
                    'adj4': 43750,
                    'adj5': 75000
                }
            },
            VERTICAL_SCROLL: {
                'displayName': 'Vertical Scroll',
                'name': 'verticalScroll',
                'avLst': {
                    'adj': 12500
                }
            },
            WAVE: {
                'displayName': 'Wave',
                'name': 'wave',
                'avLst': {
                    'adj1': 12500,
                    'adj2': 0
                }
            }
        }
    },

    globalChartCount: 0,	
    type: 'pptx', // 'ppsx'
    display: 'Microsoft PowerPoint Document',   
	
	pageName: 'slides',
	xmlPath: 'ppt', 
	xmlDocumentNamespace: 'presentation',
	
    constructor: function(config) {
        var me = this,
			documentType = me.type == 'pptx' ? 'presentation' : 'slideshow'
		
		me.callParent(arguments);
				
		/*
        // Prepare this for MS-Office:
        //this.makeMSDoc();
	
        //this._private.plugs.type.msoffice.makeOfficeGenerator('ppt', 'presentation', {});
        //this._private.features.page_name = 'slides'; // This document type must have pages.
       
		
        var type_of_main_doc = 'slideshow';
        if (this.type != 'ppsx') {
            type_of_main_doc = 'presentation';
        } // Endif.
		*/
        
		me.addInfoType('dc:title', '', 'title', 'setDocTitle');
		me.document.files_list.push({
            name: '/ppt/slideMasters/slideMaster1.xml',
            type: 'application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml',
            clear: 'type'
        }, {
            name: '/ppt/presProps.xml',
            type: 'application/vnd.openxmlformats-officedocument.presentationml.presProps+xml',
            clear: 'type'
        }, {
            name: '/ppt/presentation.xml',
            type: 'application/vnd.openxmlformats-officedocument.presentationml.' + documentType + '.main+xml',
            clear: 'type'
        }, {
            name: '/ppt/slideLayouts/slideLayout1.xml',
            type: 'application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml',
            clear: 'type'
        }, {
            name: '/ppt/tableStyles.xml',
            type: 'application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml',
            clear: 'type'
        }, {
            name: '/ppt/viewProps.xml',
            type: 'application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml',
            clear: 'type'
        });
		me.document.rels_app.push({
            type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster',
            target: 'slideMasters/slideMaster1.xml',
            clear: 'type'
        });
		
		me.addDocumentTypeResources();
		
        // Apple Keynote requires these added *after* all slides.
        me.on('beforegenerate', function() {
            me.document.rels_app.push({
                type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps',
                target: 'presProps.xml',
                clear: 'type'
            }, {
                type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps',
                target: 'viewProps.xml',
                clear: 'type'
            }, {
                type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme',
                target: 'theme/theme1.xml',
                clear: 'type'
            }, {
                type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles',
                target: 'tableStyles.xml',
                clear: 'type'
            });
        });

    },
	addDocumentTypeResources: function () {
		var me = this;
		me._addResourceToParse('ppt\\presProps.xml', 'buffer', null, me.generatePptxPropsXMLMarkup, true);
        me._addResourceToParse('ppt\\tableStyles.xml', 'buffer', null, me.generatePptxStylesXMLMarkup, true);
        me._addResourceToParse('ppt\\viewProps.xml', 'buffer', null, me.generatePptxViewPropsXMLMarkup, true);
        me._addResourceToParse('ppt\\presentation.xml', 'buffer', null, me.generatePptxPresentationXMLMarkup, true);
        me._addResourceToParse('ppt\\slideLayouts\\slideLayout1.xml', 'buffer', null, me.generatePptxLayoutXMLMarkup, true);
        me._addResourceToParse('ppt\\slideLayouts\\_rels\\slideLayout1.xml.rels', 'buffer', [{
            type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster',
            target: '../slideMasters/slideMaster1.xml'
        }], me.generateRelsXMLMarkup, true);
        me._addResourceToParse('ppt\\slideMasters\\slideMaster1.xml', 'buffer', null, me.generatePptxSlideMasterXMLMarkup, true);
        me._addResourceToParse('ppt\\slideMasters\\_rels\\slideMaster1.xml.rels', 'buffer', [{
            type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
            target: '../slideLayouts/slideLayout1.xml'
        }, {
            type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme',
            target: '../theme/theme1.xml'
        }], me.generateRelsXMLMarkup, true);
        me._addResourceToParse('docProps\\app.xml', 'buffer', null, me.generatePptxDocPropsAppXMLMarkup, true);
		me._addResourceToParse('ppt\\_rels\\presentation.xml.rels', 'buffer', me.document.rels_app, me.generateRelsXMLMarkup, true);

	},
    
	addSlide: function(config) {
        config = config || {};
		var me = this,
            pageNumber = me.pages.length,
			//slideCount = me.pages.getCount(),            
			slideObj = {
                show: true
            },
			slide;
		//slide = Ext.create('Custom.extension.PowerPointSlide', config);
		
        me.pages[pageNumber] = {};
        me.pages[pageNumber].slide = slideObj;
        me.pages[pageNumber].data = [];
        me.pages[pageNumber].rels = [{
            type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
            target: '../slideLayouts/slideLayout1.xml',
            clear: 'data'
        }];
		
		//me.addSlideToFilesList(slide);
		//me.addSlideRelationship(slide);
		
		//return slide;
        me.document.files_list.push({
            name: '/ppt/slides/slide' + (pageNumber + 1) + '.xml',
            type: 'application/vnd.openxmlformats-officedocument.presentationml.slide+xml',
            clear: 'data'
        });
        me.document.rels_app.push({
            type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide',
            target: 'slides/slide' + (pageNumber + 1) + '.xml',
            clear: 'data'
        });

        slideObj.getPageNumber = function() {
            return pageNumber;
        };

        slideObj.name = 'Slide ' + (pageNumber + 1);

        function addParagraphApiForBasicOpt(prgObj) {
            if (!prgObj.api) {
                prgObj.api = {};
            }

            prgObj.api.options = prgObj.options;
        }

        function addParagraphApiForEffects(prgObj) {
            if (!prgObj.api) {
                prgObj.api = {};
            }

            prgObj.api.setShadowEffect = function (inType, inAlign, inColor, inTransparency, inSize, inBlur, inAngle, inDistance) {
                if (!prgObj.options.effects)
                    prgObj.options.effects = [];

                var newEffect = {
                    'type': inType,
                    'align': inAlign,
                    'color': inColor,
                    'transparency': inTransparency,
                    'size': inSize,
                    'blur': inBlur,
                    'angle': inAngle,
                    'distance': inDistance
                };

                prgObj.options.effects.push(newEffect);
            };
        }

        // A way for user to modify chart properties before generating the XML string
        slideObj.createChart = function(chartInfo) {
            return new Office.generator.OfficeChart(chartInfo);
        };
        slideObj.addTable = function(data, options) {
            var objNumber = me.pages[pageNumber].data.length;

            me.pages[pageNumber].data[objNumber] = {
                type: 'table',
                data: data,
                options: options || {}
            };

            addParagraphApiForBasicOpt(me.pages[pageNumber].data[objNumber]);
            addParagraphApiForEffects(me.pages[pageNumber].data[objNumber]);
            return me.pages[pageNumber].data[objNumber].api;
        };
        /**
         * Generate the chart based on input data.
         * renderType should belong to: 'column', 'pie'
         * data a JSON object with follow the following format
         *      { 	
         * 			title: 'eSurvey chart',
         * 			data:  [
         * 				{
         * 					name: 'Income',
         * 					labels: ['2005', '2006', '2007', '2008', '2009'],
         * 					values: [23.5, 26.2, 30.1, 29.5, 24.6]
         * 				},
         * 				{
         * 					name: 'Expense',
         * 					labels: ['2005', '2006', '2007', '2008', '2009'],
         * 					values: [18.1, 22.8, 23.9, 25.1, 25]
         * 				}
         * 			]
         *  	}		 
         */
        slideObj.addChart = function(data, renderType, callback, errorCallback) {
            /*
			var objNumber = me._private.pages[pageNumber].data.length;
			me.GLOBAL_CHART_COUNT += 1;

			me._private.pages[pageNumber].data[objNumber] = {};
			me._private.pages[pageNumber].data[objNumber].type = 'chart';
			me._private.pages[pageNumber].data[objNumber].renderType = 'column';
			me._private.pages[pageNumber].data[objNumber].title = data['title'];
			me._private.pages[pageNumber].data[objNumber].data = data['data'];
			//data['renderType'] = renderType;

			// First, generate a temporatory excel file for storing the chart's data
			var workbook = excelbuilder.createWorkbook('/tmp/', 'sample' + me.GLOBAL_CHART_COUNT + '.xlsx');

			// Create a new worksheet with 10 columns and 12 rows
			// number of columns: data['data'].length+1 -> equaly number of series
			// number of rows: data['data'][0].values.length+1
			var sheet1 = workbook.createSheet('Sheet1', data['data'].length+1, data['data'][0].values.length+1);
			var headerrow = 1;

			// write header using serie name
			for( var j=0; j < data['data'].length; j++ )
			{
				sheet1.set(j+2, headerrow, data['data'][j].name);
			}
			
			// write category column in the first column
			for( var j=0; j < data['data'][0].labels.length; j++ )
			{
				sheet1.set(1, j+2, data['data'][0].labels[j]);
			}
			
			// for each serie, write out values in its row
			for (var i = 0; i < data['data'].length; i++)
			{
				for( var j=0; j < data['data'][i].values.length; j++ )
				{
					// col i+2
					// row j+1
					sheet1.set(i+2, j+2, data['data'][i].values[j]);
				}
			}
			
			// Fill some data
			// Save it
			var localEmbeddingExcelFile = 'ppt\\embeddings\\Microsoft_Excel_Worksheet' + me.GLOBAL_CHART_COUNT + '.xlsx';
			var tmpExcelFile = '/tmp/sample'+me.GLOBAL_CHART_COUNT+'.xlsx';
			// will copy the tmpExcelFile into localEmbeddingExcelFile
			me._private.plugs.intAddAnyResourceToParse ( localEmbeddingExcelFile, 'file', tmpExcelFile, me.cbMakeChartDataExcel, false, true );
			me._private.plugs.intAddAnyResourceToParse ( 'ppt\\charts\\chart'+me.GLOBAL_CHART_COUNT+'.xml', 'buffer', data, me.cbMakeCharts, true );
			me._private.plugs.intAddAnyResourceToParse ( 'ppt\\charts\\_rels\\chart'+me.GLOBAL_CHART_COUNT+'.xml.rels', 'buffer', [
					{
						type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/package',
						target: '../embeddings/Microsoft_Excel_Worksheet'+me.GLOBAL_CHART_COUNT+'.xlsx'
					}
				], me._private.plugs.type.msoffice.cbMakeRels, true );
			me._private.type.msoffice.files_list.push (
				{
					name: '/ppt/charts/chart'+GLOBAL_CHART_COUNT+'.xml',
					type: 'application/vnd.openxmlformats-officedocument.drawingml.chart+xml',
					clear: 'type'
				},
				{
					name: '/ppt/embeddings/Microsoft_Excel_Worksheet'+me.GLOBAL_CHART_COUNT+'.xlsx',
					type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					ext: 'xlsx',
					clear: 'type'
				}
			);
			
			me._private.pages[pageNumber].rels.push (
			{
				type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart',
				target: '../charts/chart'+me.GLOBAL_CHART_COUNT+'.xml',
				clear: 'data'
			});
			
			workbook.save(function(err){
				if (err) 
				{
				  workbook.cancel();
				}
				else
				{
				  console.log(tmpExcelFile + ' generated');
					callback();
				}
			});
			*/
        }
        /**
         * Generate the column chart based on input data.
         * 
         * data a JSON object with follow the following format
         *      { 	
         * 			title: 'eSurvey chart',
         * 			data:  [
         * 				{
         * 					name: 'Income',
         * 					labels: ['2005', '2006', '2007', '2008', '2009'],
         * 					values: [23.5, 26.2, 30.1, 29.5, 24.6]
         * 				},
         * 				{
         * 					name: 'Expense',
         * 					labels: ['2005', '2006', '2007', '2008', '2009'],
         * 					values: [18.1, 22.8, 23.9, 25.1, 25]
         * 				}
         * 			]
         *  	}
         */
        slideObj.addColumnChart = function(data, cb, errCb) {
            this.addChart(data, 'column', cb, errCb);
        }
        /**
         * Generate the pie chart based on input data.
         */
        slideObj.addPieChart = function(data, cb, errCb) {
            this.addChart(data, 'pie');
        }
        /**
         * Generate the bar chart based on input data.
         */
        slideObj.addBarChart = function(data, cb, errCb) {
            this.addChart(data, 'bar');
        }
        slideObj.addGroupBarChart = function(data, cb, errCb) {
            this.addChart(data, 'group-bar');
        }
        slideObj.addText = function(text, opt, y_pos, x_size, y_size, opt_b) {
            var objNumber = me.pages[pageNumber].data.length;

            me.pages[pageNumber].data[objNumber] = {};
            me.pages[pageNumber].data[objNumber].type = 'text';
            me.pages[pageNumber].data[objNumber].text = text;
            me.pages[pageNumber].data[objNumber].options = typeof opt == 'object' ? opt : {};

            if (typeof opt == 'string') {
                me.pages[pageNumber].data[objNumber].options.color = opt;

            } else if ((typeof opt != 'object') && (typeof y_pos != 'undefined')) {
                me.pages[pageNumber].data[objNumber].options.x = opt;
                me.pages[pageNumber].data[objNumber].options.y = y_pos;

                if ((typeof x_size != 'undefined') && (typeof y_size != 'undefined')) {
                    me.pages[pageNumber].data[objNumber].options.cx = x_size;
                    me.pages[pageNumber].data[objNumber].options.cy = y_size;
                }
            }

            if (typeof opt_b == 'object') {
                for (var attrname in opt_b) {
                    me.pages[pageNumber].data[objNumber].options[attrname] = opt_b[attrname];
                }

            } else if ((typeof x_size == 'object') && (typeof y_size == 'undefined')) {
                for (var attrname in x_size) {
                    me.pages[pageNumber].data[objNumber].options[attrname] = x_size[attrname];
                }
            }

            addParagraphApiForBasicOpt(me.pages[pageNumber].data[objNumber]);
            addParagraphApiForEffects(me.pages[pageNumber].data[objNumber]);
            return me.pages[pageNumber].data[objNumber].api;
        };
        slideObj.addShape = function(shape, opt, y_pos, x_size, y_size, opt_b) {
            var objNumber = me.pages[pageNumber].data.length;

            me.pages[pageNumber].data[objNumber] = {};
            me.pages[pageNumber].data[objNumber].type = 'text';
            me.pages[pageNumber].data[objNumber].options = typeof opt == 'object' ? opt : {};
            me.pages[pageNumber].data[objNumber].options.shape = shape;

            if (typeof opt == 'string') {
                me.pages[pageNumber].data[objNumber].options.color = opt;

            } else if ((typeof opt != 'object') && (typeof y_pos != 'undefined')) {
                me.pages[pageNumber].data[objNumber].options.x = opt;
                me.pages[pageNumber].data[objNumber].options.y = y_pos;

                if ((typeof x_size != 'undefined') && (typeof y_size != 'undefined')) {
                    me.pages[pageNumber].data[objNumber].options.cx = x_size;
                    me.pages[pageNumber].data[objNumber].options.cy = y_size;
                } // Endif.
            } // Endif.

            if (typeof opt_b == 'object') {
                for (var attrname in opt_b) {
                    me.pages[pageNumber].data[objNumber].options[attrname] = opt_b[attrname];
                }

            } else if ((typeof x_size == 'object') && (typeof y_size == 'undefined')) {
                for (var attrname in x_size) {
                    me.pages[pageNumber].data[objNumber].options[attrname] = x_size[attrname];
                }
            } // Endif.

            addParagraphApiForBasicOpt(me.pages[pageNumber].data[objNumber]);
            addParagraphApiForEffects(me.pages[pageNumber].data[objNumber]);
            return me.pages[pageNumber].data[objNumber].api;
        };
        slideObj.addImage = function(image_path, opt, y_pos, x_size, y_size, image_format_type) {
            var objNumber = me.pages[pageNumber].data.length;
            var image_type = (typeof image_format_type == 'string') ? image_format_type : 'png';
            var defWidth, defHeight = 0;

            if (typeof image_path == 'string') {
                var ret_data = fast_image_size(image_path);
                if (ret_data.type == 'unknown') {
                    var image_ext = path.extname(image_path);

                    switch (image_ext) {
                        case '.bmp':
                            image_type = 'bmp';
                            break;

                        case '.gif':
                            image_type = 'gif';
                            break;

                        case '.jpg':
                        case '.jpeg':
                            image_type = 'jpeg';
                            break;

                        case '.emf':
                            image_type = 'emf';
                            break;

                        case '.tiff':
                            image_type = 'tiff';
                            break;
                    } // End of switch.

                } else {
                    if (ret_data.width) {
                        defWidth = ret_data.width;
                    }

                    if (ret_data.height) {
                        defHeight = ret_data.height;
                    }

                    image_type = ret_data.type;
                    if (image_type == 'jpg') {
                        image_type = 'jpeg';
                    }
                } 
            }

            me.pages[pageNumber].data[objNumber] = {};
            me.pages[pageNumber].data[objNumber].type = 'image';
            me.pages[pageNumber].data[objNumber].image = image_path;
            me.pages[pageNumber].data[objNumber].options = typeof opt == 'object' ? opt : {};

            if (!me.pages[pageNumber].data[objNumber].options.cx && defWidth) {
                me.pages[pageNumber].data[objNumber].options.cx = defWidth;
            }

            if (!me.pages[pageNumber].data[objNumber].options.cy && defHeight) {
                me.pages[pageNumber].data[objNumber].options.cy = defHeight;
            }

            var image_id = me.document.src_files_list.indexOf(image_path);
            var image_rel_id = -1;

            if (image_id >= 0) {
                for (var j = 0, total_size_j = me.pages[pageNumber].rels.length; j < total_size_j; j++) {
                    if (me.pages[pageNumber].rels[j].target == ('../media/image' + (image_id + 1) + '.' + image_type)) {
                        image_rel_id = j + 1;
                    } // Endif.
                } // Endif.

            } else {
                image_id = me.document.src_files_list.length;
                me.document.src_files_list[image_id] = image_path;
                me._addResourceToParse('ppt\\media\\image' + (image_id + 1) + '.' + image_type, (typeof image_path == 'string') ? 'file' : 'stream', image_path, null, false);
            } // Endif.

            if (image_rel_id == -1) {
                image_rel_id = me.pages[pageNumber].rels.length + 1;

                me.pages[pageNumber].rels.push({
                    type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
                    target: '../media/image' + (image_id + 1) + '.' + image_type,
                    clear: 'data'
                });
            }

            if ((opt || {}).link) {
                var link_rel_id = me.pages[pageNumber].rels.length + 1;

                me.pages[pageNumber].rels.push({
                    type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink',
                    target: opt.link,
                    targetMode: 'External'
                });

                me.pages[pageNumber].data[objNumber].link_rel_id = link_rel_id;
            }
           
            me.pages[pageNumber].data[objNumber].image_id = image_id;
            me.pages[pageNumber].data[objNumber].rel_id = image_rel_id;

            if (typeof opt == 'string') {
                me.pages[pageNumber].data[objNumber].options.color = opt;

            } else if ((typeof opt != 'object') && (typeof y_pos != 'undefined')) {
                me.pages[pageNumber].data[objNumber].options.x = opt;
                me.pages[pageNumber].data[objNumber].options.y = y_pos;

                if ((typeof x_size != 'undefined') && (typeof y_size != 'undefined')) {
                    me.pages[pageNumber].data[objNumber].options.cx = x_size;
                    me.pages[pageNumber].data[objNumber].options.cy = y_size;
                } // Endif.
            } // Endif.

            addParagraphApiForBasicOpt(me.pages[pageNumber].data[objNumber]);
            addParagraphApiForEffects(me.pages[pageNumber].data[objNumber]);
            return me.pages[pageNumber].data[objNumber].api;
        };
        slideObj.addP = function(text, opt, y_pos, x_size, y_size, opt_b) {
            var objNumber = me.pages[pageNumber].data.length;

            me.pages[pageNumber].data[objNumber] = {};
            me.pages[pageNumber].data[objNumber].type = 'p';
            me.pages[pageNumber].data[objNumber].data = [];
            me.pages[pageNumber].data[objNumber].options = typeof opt == 'object' ? opt : {};

            if (typeof opt == 'string') {
                me.pages[pageNumber].data[objNumber].options.color = opt;

            } else if ((typeof opt != 'object') && (typeof y_pos != 'undefined')) {
                me.pages[pageNumber].data[objNumber].options.x = opt;
                me.pages[pageNumber].data[objNumber].options.y = y_pos;

                if ((typeof x_size != 'undefined') && (typeof y_size != 'undefined')) {
                    me.pages[pageNumber].data[objNumber].options.cx = x_size;
                    me.pages[pageNumber].data[objNumber].options.cy = y_size;
                }
            }

            if (typeof opt_b == 'object') {
                for (var attrname in opt_b) {
                    me.pages[pageNumber].data[objNumber].options[attrname] = opt_b[attrname];
                }

            } else if ((typeof x_size == 'object') && (typeof y_size == 'undefined')) {
                for (var attrname in x_size) {
                    me.pages[pageNumber].data[objNumber].options[attrname] = x_size[attrname];
                }
            }

            return me.pages[pageNumber].data[objNumber].data;
        };

        me._addResourceToParse('ppt\\slides\\slide' + (pageNumber + 1) + '.xml', 'buffer', me.pages[pageNumber], me.generatePptxSlideXMLMarkup, false);
        me._addResourceToParse('ppt\\slides\\_rels\\slide' + (pageNumber + 1) + '.xml.rels', 'buffer', me.pages[pageNumber].rels, me.generateRelsXMLMarkup, false);
        return slideObj;
    },
	
    getShapeInfo: function(shapeName) {
        if (!shapeName) {
            return this.self.shapes.RECTANGLE;
        }

        if ((typeof shapeName == 'object') && shapeName.name && shapeName.displayName && shapeName.avLst) {
            return shapeName;
        }

        if (this.self.shapes[shapeName]) {
            return this.self.shapes[shapeName];
        }

        for (var shapeIntName in this.self.shapes) {
            if (this.self.shapes[shapeIntName].name == shapeName) {
                return this.self.shapes[shapeIntName];
            }

            if (this.self.shapes[shapeIntName].displayName == shapeName) {
                return this.self.shapes[shapeIntName];
            }
        }

        return this.self.shapes.RECTANGLE;
    },
    generatePptxPropsXMLMarkup: function(data) {
        return this.generateXMLHeaderMarkup(data) +
            '<p:presentationPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">\
			<p:extLst>\
				<p:ext uri="{E76CE94A-603C-4142-B9EB-6D1370010A27}">\
					<p14:discardImageEditData xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" val="0"/>\
				</p:ext>\
				<p:ext uri="{D31A062A-798A-4329-ABDD-BBA856620510}">\
					<p14:defaultImageDpi xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" val="220"/>\
				</p:ext>\
				<p:ext uri="{FD5EFAAD-0ECE-453E-9831-46B23BE46B34}">\
					<p15:chartTrackingRefBased xmlns:p15="http://schemas.microsoft.com/office/powerpoint/2012/main" val="1"/>\
				</p:ext>\
			</p:extLst>\
		</p:presentationPr>';
    },
    generatePptxStylesXMLMarkup: function(data) {
        return this.generateXMLHeaderMarkup(data) + '<a:tblStyleLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>';
    },
    generatePptxViewPropsXMLMarkup: function(data) {
        return this.generateXMLHeaderMarkup(data) + '<p:viewPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:normalViewPr><p:restoredLeft sz="15620"/><p:restoredTop sz="94660"/></p:normalViewPr><p:slideViewPr><p:cSldViewPr><p:cViewPr varScale="1"><p:scale><a:sx n="64" d="100"/><a:sy n="64" d="100"/></p:scale><p:origin x="-1392" y="-96"/></p:cViewPr><p:guideLst><p:guide orient="horz" pos="2160"/><p:guide pos="2880"/></p:guideLst></p:cSldViewPr></p:slideViewPr><p:notesTextViewPr><p:cViewPr><p:scale><a:sx n="100" d="100"/><a:sy n="100" d="100"/></p:scale><p:origin x="0" y="0"/></p:cViewPr></p:notesTextViewPr><p:gridSpacing cx="78028800" cy="78028800"/></p:viewPr>';
    },
    generatePptxLayoutXMLMarkup: function(data) {
        return this.generateXMLHeaderMarkup(data) + '<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="title" preserve="1"><p:cSld name="Title Slide"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr><p:sp><p:nvSpPr><p:cNvPr id="2" name="Title 1"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="ctrTitle"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="685800" y="2130425"/><a:ext cx="7772400" cy="1470025"/></a:xfrm></p:spPr><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:r><a:rPr lang="en-US" smtClean="0"/><a:t>Click to edit Master title style</a:t></a:r><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="3" name="Subtitle 2"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="subTitle" idx="1"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="1371600" y="3886200"/><a:ext cx="6400800" cy="1752600"/></a:xfrm></p:spPr><p:txBody><a:bodyPr/><a:lstStyle><a:lvl1pPr marL="0" indent="0" algn="ctr"><a:buNone/><a:defRPr><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl1pPr><a:lvl2pPr marL="457200" indent="0" algn="ctr"><a:buNone/><a:defRPr><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl2pPr><a:lvl3pPr marL="914400" indent="0" algn="ctr"><a:buNone/><a:defRPr><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl3pPr><a:lvl4pPr marL="1371600" indent="0" algn="ctr"><a:buNone/><a:defRPr><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl4pPr><a:lvl5pPr marL="1828800" indent="0" algn="ctr"><a:buNone/><a:defRPr><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl5pPr><a:lvl6pPr marL="2286000" indent="0" algn="ctr"><a:buNone/><a:defRPr><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl6pPr><a:lvl7pPr marL="2743200" indent="0" algn="ctr"><a:buNone/><a:defRPr><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl7pPr><a:lvl8pPr marL="3200400" indent="0" algn="ctr"><a:buNone/><a:defRPr><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl8pPr><a:lvl9pPr marL="3657600" indent="0" algn="ctr"><a:buNone/><a:defRPr><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl9pPr></a:lstStyle><a:p><a:r><a:rPr lang="en-US" smtClean="0"/><a:t>Click to edit Master subtitle style</a:t></a:r><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="4" name="Date Placeholder 3"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="dt" sz="half" idx="10"/></p:nvPr></p:nvSpPr><p:spPr/><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:fld id="{F8166F1F-CE9B-4651-A6AA-CD717754106B}" type="datetimeFigureOut"><a:rPr lang="en-US" smtClean="0"/><a:t>6/13/2013</a:t></a:fld><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="5" name="Footer Placeholder 4"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="ftr" sz="quarter" idx="11"/></p:nvPr></p:nvSpPr><p:spPr/><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="6" name="Slide Number Placeholder 5"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="sldNum" sz="quarter" idx="12"/></p:nvPr></p:nvSpPr><p:spPr/><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:fld id="{F7021451-1387-4CA6-816F-3879F97B5CBC}" type="slidenum"><a:rPr lang="en-US" smtClean="0"/><a:t>â¹#âº</a:t></a:fld><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>';
    },
    generatePptxPresentationXMLMarkup: function(data) {
        var outString = this.generateXMLHeaderMarkup(data) + '<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" saveSubsetFonts="1"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst>';

        for (var i = 0, total_size = this.pages.length; i < total_size; i++) {
            outString += '<p:sldId id="' + (i + 256) + '" r:id="rId' + (i + 2) + '"/>';
        }

        outString += '</p:sldIdLst><p:sldSz cx="9144000" cy="6858000" type="screen4x3"/><p:notesSz cx="6858000" cy="9144000"/><p:defaultTextStyle><a:defPPr><a:defRPr lang="en-US"/></a:defPPr>';

        var curPos = 0;
        for (var i = 1; i < 10; i++) {
            outString += '<a:lvl' + i + 'pPr marL="' + curPos + '" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl' + i + 'pPr>';
            curPos += 457200;
        }

        outString += '</p:defaultTextStyle>';

        outString += '<p:extLst>\
			<p:ext uri="{EFAFB233-063F-42B5-8137-9DF3F51BA10A}">\
				<p15:sldGuideLst xmlns:p15="http://schemas.microsoft.com/office/powerpoint/2012/main"/>\
			</p:ext>\
		</p:extLst></p:presentation>';

        return outString;
    },
    generatePptxSlideMasterXMLMarkup: function(data) {
        return this.generateXMLHeaderMarkup(data) + '<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:bg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:bg><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr><p:sp><p:nvSpPr><p:cNvPr id="2" name="Title Placeholder 1"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="title"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="457200" y="274638"/><a:ext cx="8229600" cy="1143000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0" anchor="ctr"><a:normAutofit/></a:bodyPr><a:lstStyle/><a:p><a:r><a:rPr lang="en-US" smtClean="0"/><a:t>Click to edit Master title style</a:t></a:r><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="3" name="Text Placeholder 2"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="457200" y="1600200"/><a:ext cx="8229600" cy="4525963"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0"><a:normAutofit/></a:bodyPr><a:lstStyle/><a:p><a:pPr lvl="0"/><a:r><a:rPr lang="en-US" smtClean="0"/><a:t>Click to edit Master text styles</a:t></a:r></a:p><a:p><a:pPr lvl="1"/><a:r><a:rPr lang="en-US" smtClean="0"/><a:t>Second level</a:t></a:r></a:p><a:p><a:pPr lvl="2"/><a:r><a:rPr lang="en-US" smtClean="0"/><a:t>Third level</a:t></a:r></a:p><a:p><a:pPr lvl="3"/><a:r><a:rPr lang="en-US" smtClean="0"/><a:t>Fourth level</a:t></a:r></a:p><a:p><a:pPr lvl="4"/><a:r><a:rPr lang="en-US" smtClean="0"/><a:t>Fifth level</a:t></a:r><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="4" name="Date Placeholder 3"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="dt" sz="half" idx="2"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="457200" y="6356350"/><a:ext cx="2133600" cy="365125"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0" anchor="ctr"/><a:lstStyle><a:lvl1pPr algn="l"><a:defRPr sz="1200"><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl1pPr></a:lstStyle><a:p><a:fld id="{F8166F1F-CE9B-4651-A6AA-CD717754106B}" type="datetimeFigureOut"><a:rPr lang="en-US" smtClean="0"/><a:t>6/13/2013</a:t></a:fld><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="5" name="Footer Placeholder 4"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="ftr" sz="quarter" idx="3"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="3124200" y="6356350"/><a:ext cx="2895600" cy="365125"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0" anchor="ctr"/><a:lstStyle><a:lvl1pPr algn="ctr"><a:defRPr sz="1200"><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl1pPr></a:lstStyle><a:p><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="6" name="Slide Number Placeholder 5"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="sldNum" sz="quarter" idx="4"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="6553200" y="6356350"/><a:ext cx="2133600" cy="365125"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0" anchor="ctr"/><a:lstStyle><a:lvl1pPr algn="r"><a:defRPr sz="1200"><a:solidFill><a:schemeClr val="tx1"><a:tint val="75000"/></a:schemeClr></a:solidFill></a:defRPr></a:lvl1pPr></a:lstStyle><a:p><a:fld id="{F7021451-1387-4CA6-816F-3879F97B5CBC}" type="slidenum"><a:rPr lang="en-US" smtClean="0"/><a:t>â¹#âº</a:t></a:fld><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle><a:lvl1pPr algn="ctr" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="0"/></a:spcBef><a:buNone/><a:defRPr sz="4400" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mj-lt"/><a:ea typeface="+mj-ea"/><a:cs typeface="+mj-cs"/></a:defRPr></a:lvl1pPr></p:titleStyle><p:bodyStyle><a:lvl1pPr marL="342900" indent="-342900" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="â¢"/><a:defRPr sz="3200" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl1pPr><a:lvl2pPr marL="742950" indent="-285750" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="â"/><a:defRPr sz="2800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl2pPr><a:lvl3pPr marL="1143000" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="â¢"/><a:defRPr sz="2400" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl3pPr><a:lvl4pPr marL="1600200" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="â"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl4pPr><a:lvl5pPr marL="2057400" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="Â»"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl5pPr><a:lvl6pPr marL="2514600" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="â¢"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl6pPr><a:lvl7pPr marL="2971800" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="â¢"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl7pPr><a:lvl8pPr marL="3429000" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="â¢"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl8pPr><a:lvl9pPr marL="3886200" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="â¢"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl9pPr></p:bodyStyle><p:otherStyle><a:defPPr><a:defRPr lang="en-US"/></a:defPPr><a:lvl1pPr marL="0" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl1pPr><a:lvl2pPr marL="457200" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl2pPr><a:lvl3pPr marL="914400" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl3pPr><a:lvl4pPr marL="1371600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl4pPr><a:lvl5pPr marL="1828800" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl5pPr><a:lvl6pPr marL="2286000" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl6pPr><a:lvl7pPr marL="2743200" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl7pPr><a:lvl8pPr marL="3200400" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl8pPr><a:lvl9pPr marL="3657600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl9pPr></p:otherStyle></p:txStyles></p:sldMaster>';
    },
    generatePptxDocPropsAppXMLMarkup: function(data) {
        var slidesCount = this.pages.length;
        var userName = this.creator
        var outString = this.generateXMLHeaderMarkup(data) + '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><TotalTime>0</TotalTime><Words>0</Words><Application>Microsoft Office PowerPoint</Application><PresentationFormat>On-screen Show (4:3)</PresentationFormat><Paragraphs>0</Paragraphs><Slides>' + slidesCount + '</Slides><Notes>0</Notes><HiddenSlides>0</HiddenSlides><MMClips>0</MMClips><ScaleCrop>false</ScaleCrop><HeadingPairs><vt:vector size="4" baseType="variant"><vt:variant><vt:lpstr>Theme</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant><vt:variant><vt:lpstr>Slide Titles</vt:lpstr></vt:variant><vt:variant><vt:i4>' + slidesCount + '</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="' + (slidesCount + 1) + '" baseType="lpstr"><vt:lpstr>Office Theme</vt:lpstr>';

        for (var i = 0, total_size = this.pages.length; i < total_size; i++) {
            outString += '<vt:lpstr>' + Ext.String.htmlEncode(this.pages[i].slide.name) + '</vt:lpstr>';
        } // End of for loop.

        outString += '</vt:vector></TitlesOfParts><Company>' + userName + '</Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>12.0000</AppVersion></Properties>';
        return outString;
    },
	generatePptxSlideXMLMarkup: function(data) {
        var outString = this.generateXMLHeaderMarkup(data) + '<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"';
        var objs_list = data.data;
        var timingData = '';

        if (!data.slide.show) {
            outString += ' show="0"';
        }

        outString += '><p:cSld>';

        if (data.slide.background) {
            outString += this.generatePptxColorSelectionXMLMarkup(false, data.slide.background);
        }

        outString += '<p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>';

        // Loop on all the objects inside the slide to add it into the slide:
        for (var i = 0, total_size = objs_list.length; i < total_size; i++) {
            var x = 0;
            var y = 0;
            var cx = 2819400;
            var cy = 369332;

            var moreStyles = '';
            var moreStylesAttr = '';
            var outStyles = '';
            var styleData = '';
            var shapeType = null;
            var locationAttr = '';

            if (objs_list[i].options) {
                if (typeof objs_list[i].options.cx != 'undefined') {
                    if (objs_list[i].options.cx) {
                        cx = this.parseSmartNumber(objs_list[i].options.cx, 9144000, 2819400, 9144000, 10000);

                    } else {
                        cx = 1;
                    } // Endif.
                } // Endif.

                if (typeof objs_list[i].options.cy != 'undefined') {
                    if (objs_list[i].options.cy) {
                        cy = this.parseSmartNumber(objs_list[i].options.cy, 6858000, 369332, 6858000, 10000);

                    } else {
                        cy = 1;
                    } // Endif.
                } // Endif.

                if (objs_list[i].options.x) {
                    x = this.parseSmartNumber(objs_list[i].options.x, 9144000, 0, 9144000 - cx, 10000);
                } // Endif.

                if (objs_list[i].options.y) {
                    y = this.parseSmartNumber(objs_list[i].options.y, 6858000, 0, 6858000 - cy, 10000);
                } // Endif.

                if (objs_list[i].options.shape) {
                    shapeType = this.getShapeInfo(objs_list[i].options.shape);
                } // Endif.

                if (objs_list[i].options.flip_vertical) {
                    locationAttr += ' flipV="1"';
                } // Endif.

                if (objs_list[i].options.rotate) {
                    var rotateVal = objs_list[i].options.rotate > 360 ? (objs_list[i].options.rotate - 360) : objs_list[i].options.rotate;
                    rotateVal *= 60000;
                    locationAttr += ' rot="' + rotateVal + '"';
                } // Endif.
            } // Endif.

            switch (objs_list[i].type) {
                // TODO: remove hard code here
                case 'table':
					var table_obj = Custom.extension.GenOfficeTable.getTable(objs_list[i].data, objs_list[i].options);									
					var table_xml = new Custom.xmlbuilder.XMLBuilder(table_obj, {
                        version: '1.0',
                        encoding: 'UTF-8',
                        standalone: true
                    }).root().toString({
                        pretty: true,
                        indent: '  ',
                        newline: '\n'
                    });

                    outString += table_xml;
                    break;

                case 'chart':
                    // loop through the charts
                    
                    if (objs_list[i].renderType === 'pie') {
                        outString += '<p:graphicFrame>\
							<p:nvGraphicFramePr>\
								<p:cNvPr id="20" name="OfficeChart 19"/>\
								<p:cNvGraphicFramePr/>\
								<p:nvPr>\
									<p:extLst>\
										<p:ext uri="{D42A27DB-BD31-4B8C-83A1-F6EECF244321}">\
											<p14:modId xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" val="4198609065"/>\
										</p:ext>\
									</p:extLst>\
								</p:nvPr>\
							</p:nvGraphicFramePr>\
							<p:xfrm>\
								<a:off x="1524000" y="1397000"/>\
								<a:ext cx="6096000" cy="4064000"/>\
							</p:xfrm>\
							<a:graphic>\
								<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart">\
									<c:chart xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="rId2"/>\
								</a:graphicData>\
							</a:graphic>\
						</p:graphicFrame>'
                    } else if (objs_list[i].renderType === 'column') {
                        outString += '\
						\
						<p:graphicFrame>\
							<p:nvGraphicFramePr>\
								<p:cNvPr id="4" name="OfficeChart 3"/>\
								<p:cNvGraphicFramePr/>\
								<p:nvPr>\
									<p:extLst>\
										<p:ext uri="{D42A27DB-BD31-4B8C-83A1-F6EECF244321}">\
											<p14:modId xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" val="1256887135"/>\
										</p:ext>\
									</p:extLst>\
								</p:nvPr>\
							</p:nvGraphicFramePr>\
							<p:xfrm>\
								<a:off x="1524000" y="1397000"/>\
								<a:ext cx="6096000" cy="4064000"/>\
							</p:xfrm>\
							<a:graphic>\
								<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart">\
									<c:chart xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="rId2"/>\
								</a:graphicData>\
							</a:graphic>\
						</p:graphicFrame>\
						'
                    }
                    break;
                case 'text':
                case 'cxn':
                    var effectsList = '';

                    if (shapeType == null) shapeType = this.getShapeInfo(null);

                    if (objs_list[i].type == 'cxn') {
                        outString += '<p:cxnSp><p:nvCxnSpPr>';
                        outString += '<p:cNvPr id="' + (i + 2) + '" name="Object ' + (i + 1) + '"/><p:nvPr/></p:nvCxnSpPr>';

                    } else {
                        outString += '<p:sp><p:nvSpPr>';
                        outString += '<p:cNvPr id="' + (i + 2) + '" name="Object ' + (i + 1) + '"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>';
                    } // Endif.

                    outString += '<p:spPr>';

                    outString += '<a:xfrm' + locationAttr + '>';

                    outString += '<a:off x="' + x + '" y="' + y + '"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm><a:prstGeom prst="' + shapeType.name + '"><a:avLst/></a:prstGeom>';

                    if (objs_list[i].options) {
                        if (objs_list[i].options.fill) {
                            outString += this.generatePptxColorSelectionXMLMarkup(objs_list[i].options.fill);

                        } else {
                            outString += '<a:noFill/>';
                        } // Endif.

                        if (objs_list[i].options.line) {
                            var lineAttr = '';

                            if (objs_list[i].options.line_size) {
                                lineAttr += ' w="' + (objs_list[i].options.line_size * 12700) + '"';
                            } // Endif.

                            // cmpd="dbl"

                            outString += '<a:ln' + lineAttr + '>';
                            outString += this.generatePptxColorSelectionXMLMarkup(objs_list[i].options.line);

                            if (objs_list[i].options.line_head) {
                                outString += '<a:headEnd type="' + objs_list[i].options.line_head + '"/>';
                            } // Endif.

                            if (objs_list[i].options.line_tail) {
                                outString += '<a:tailEnd type="' + objs_list[i].options.line_tail + '"/>';
                            } // Endif.

                            outString += '</a:ln>';
                        } // Endif.

                    } else {
                        outString += '<a:noFill/>';
                    }

                    if (objs_list[i].options.effects) {
                        for (var ii = 0, total_size_ii = objs_list[i].options.effects.length; ii < total_size_ii; ii++) {
                            switch (objs_list[i].options.effects[ii].type) {
                                case 'outerShadow':
                                    effectsList += this.generatePptxEffectsXMLMarkup(objs_list[i].options.effects[ii], 'outerShdw');
                                    break;

                                case 'innerShadow':
                                    effectsList += this.generatePptxEffectsXMLMarkup(objs_list[i].options.effects[ii], 'innerShdw');
                                    break;
                            }
                        }
                    }

                    if (effectsList != '') {
                        outString += '<a:effectLst>' + effectsList + '</a:effectLst>';
                    }

                    outString += '</p:spPr>';

                    if (objs_list[i].options) {
                        if (objs_list[i].options.align) {
                            switch (objs_list[i].options.align) {
                                case 'right':
                                    moreStylesAttr += ' algn="r"';
                                    break;

                                case 'center':
                                    moreStylesAttr += ' algn="ctr"';
                                    break;

                                case 'justify':
                                    moreStylesAttr += ' algn="just"';
                                    break;
                            }
                        }

                        if (objs_list[i].options.indentLevel > 0) {
                            moreStylesAttr += ' lvl="' + objs_list[i].options.indentLevel + '"';
                        }
                    }

                    if (moreStyles != '') {
                        outStyles = '<a:pPr' + moreStylesAttr + '>' + moreStyles + '</a:pPr>';

                    } else if (moreStylesAttr != '') {
                        outStyles = '<a:pPr' + moreStylesAttr + '/>';
                    }

                    if (styleData != '') {
                        outString += '<p:style>' + styleData + '</p:style>';
                    } // Endif.

                    if (typeof objs_list[i].text == 'string') {
                        outString += '<p:txBody>' + this.generatePptxBodyPropXMLMarkup(objs_list[i].options) + '<a:lstStyle/><a:p>' + outStyles;
                        outString += this.generatePptxOutTextCommandXMLMarkup(objs_list[i].options, objs_list[i].text, data.slide);

                    } else if (objs_list[i].text) {
                        var outBodyOpt = this.generatePptxBodyPropXMLMarkup(objs_list[i].options);
                        outString += '<p:txBody>' + outBodyOpt + '<a:lstStyle/><a:p>' + outStyles;

                        for (var j = 0, total_size_j = objs_list[i].text.length; j < total_size_j; j++) {
                            if (objs_list[i].text[j]) {
                                outString += this.generatePptxOutTextCommandXMLMarkup(objs_list[i].text[j].options, objs_list[i].text[j].text, data.slide, outBodyOpt, outStyles);
                            }
                        }
                    }

                    if (typeof objs_list[i].text != 'undefined') {
                        var font_size = '';
                        if (objs_list[i].options && objs_list[i].options.font_size) {
                            font_size = ' sz="' + objs_list[i].options.font_size + '00"';
                        }

                        outString += '<a:endParaRPr lang="en-US"' + font_size + ' dirty="0"/></a:p></p:txBody>';
                    }

                    outString += objs_list[i].type == 'cxn' ? '</p:cxnSp>' : '</p:sp>';
                    break;

                    // Table:
                case 'table':
                    outString += '<p:graphicFrame><p:nvGraphicFramePr><p:cNvPr id="' + (i + 2) + '" name="Object ' + (i + 1) + '"/><p:cNvGraphicFramePr><a:graphicFrameLocks noGrp="1"/></p:cNvGraphicFramePr><p:nvPr/></p:nvGraphicFramePr>';
                    outString += '<p:xfrm><a:off x="' + x + '" y="' + y + '"/><a:ext cx="' + cx + '" cy="' + cy + '"/></p:xfrm>';
                    outString += '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table"><a:tbl><a:tblPr firstRow="1" bandRow="1"><a:tableStyleId>{073A0DAA-6AF3-43AB-8588-CEC1D06C72B9}</a:tableStyleId></a:tblPr><a:tblGrid>';
                    outString += '</a:tblGrid>';
                    break;
                    // Image:
                case 'image':
                    //outString += '<p:pic><p:nvPicPr><p:cNvPr id="' + (i + 2) + '" name="Object ' + (i + 1) + '"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="rId' + objs_list[i].rel_id + '" cstate="print"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr><a:xfrm' + locationAttr + '><a:off x="' + x + '" y="' + y + '"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>';
                    var parts = [];
                    parts.push('<p:pic><p:nvPicPr><p:cNvPr id="' + (i + 2) + '" name="Object ' + (i + 1) + '"');
                    if (objs_list[i].link_rel_id) {
                        parts.push('><a:hlinkClick r:id="rId' + objs_list[i].link_rel_id + '"/></p:cNvPr>');
                    } else {
                        parts.push('/>');
                    }
                    parts.push('<p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="rId' + objs_list[i].rel_id + '" cstate="print"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr><a:xfrm' + locationAttr + '><a:off x="' + x + '" y="' + y + '"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>');
                    outString += parts.join('');
                    break;

                    // Paragraph:
                case 'p':
                    if (shapeType == null) shapeType = this.getShapeInfo(null);

                    outString += '<p:sp><p:nvSpPr>';
                    outString += '<p:cNvPr id="' + (i + 2) + '" name="Object ' + (i + 1) + '"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>';
                    outString += '<p:spPr>';

                    outString += '<a:xfrm' + locationAttr + '>';

                    outString += '<a:off x="' + x + '" y="' + y + '"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm><a:prstGeom prst="' + shapeType.name + '"><a:avLst/></a:prstGeom>';

                    if (objs_list[i].options) {
                        if (objs_list[i].options.fill) {
                            outString += this.generatePptxColorSelectionXMLMarkup(objs_list[i].options.fill);

                        } else {
                            outString += '<a:noFill/>';
                        }

                        if (objs_list[i].options.line) {
                            outString += '<a:ln>';
                            outString += this.generatePptxColorSelectionXMLMarkup(objs_list[i].options.line);

                            if (objs_list[i].options.line_head) {
                                outString += '<a:headEnd type="' + objs_list[i].options.line_head + '"/>';
                            }

                            if (objs_list[i].options.line_tail) {
                                outString += '<a:tailEnd type="' + objs_list[i].options.line_tail + '"/>';
                            }

                            outString += '</a:ln>';
                        } 

                    } else {
                        outString += '<a:noFill/>';
                    }

                    outString += '</p:spPr>';

                    if (styleData != '') {
                        outString += '<p:style>' + styleData + '</p:style>';
                    }

                    outString += '<p:txBody><a:bodyPr wrap="square" rtlCol="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/>';

                    for (var j = 0, total_size_j = objs_list[i].data.length; j < total_size_j; j++) {
                        if (objs_list[i].data[j]) {
                            moreStylesAttr = '';
                            moreStyles = '';

                            if (objs_list[i].data[j].options) {
                                if (objs_list[i].data[j].options.align) {
                                    switch (objs_list[i].data[j].options.align) {
                                        case 'right':
                                            moreStylesAttr += ' algn="r"';
                                            break;

                                        case 'center':
                                            moreStylesAttr += ' algn="ctr"';
                                            break;

                                        case 'justify':
                                            moreStylesAttr += ' algn="just"';
                                            break;
                                    }
                                }

                                if (objs_list[i].data[j].options.indentLevel > 0) {
                                    moreStylesAttr += ' lvl="' + objs_list[i].data[j].options.indentLevel + '"';
                                }

                                if (objs_list[i].data[j].options.listType == 'number') {
                                    moreStyles += '<a:buFont typeface="+mj-lt"/><a:buAutoNum type="arabicPeriod"/>';
                                }
                            }

                            if (moreStyles != '') {
                                outStyles = '<a:pPr' + moreStylesAttr + '>' + moreStyles + '</a:pPr>';

                            } else if (moreStylesAttr != '') {
                                outStyles = '<a:pPr' + moreStylesAttr + '/>';
                            }

                            outString += '<a:p>' + outStyles;

                            // if ( typeof objs_list[i].data[j].text == 'string' ) {
                            outString += this.generatePptxOutTextCommandXMLMarkup(objs_list[i].data[j].options, objs_list[i].data[j].text, data.slide);
                        }
                    }

                    var font_size = '';
                    if (objs_list[i].options && objs_list[i].options.font_size) {
                        font_size = ' sz="' + objs_list[i].options.font_size + '00"';
                    }

                    outString += '<a:endParaRPr lang="en-US"' + font_size + ' dirty="0"/></a:p>';
                    outString += '</p:txBody>';

                    outString += '</p:sp>';
                    break;
            }
        } 

        outString += '</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>';

        if (timingData != '') {
            outString += '<p:timing>' + timingData + '</p:timing>';
        }

        outString += '</p:sld>';
        return outString;
    },
	
	generatePptxColorSelectionXMLMarkup: function(color_info, back_info) {
        var outText = '';
        var colorVal;
        var fillType = 'solid';
        var internalElements = '';

        if (back_info) {
            outText += '<p:bg><p:bgPr>';

            outText += this.generatePptxColorSelectionXMLMarkup(back_info, false);

            outText += '<a:effectLst/>';
            // todo: (add support for effects)

            outText += '</p:bgPr></p:bg>';
        } 

        if (color_info) {
            if (typeof color_info == 'string') {
                colorVal = color_info;

            } else {
                if (color_info.type) {
                    fillType = color_info.type;
                }

                if (color_info.color) {
                    colorVal = color_info.color;
                }

                if (color_info.alpha) {
                    internalElements += '<a:alpha val="' + (100 - color_info.alpha) + '000"/>';
                }
            }

            switch (fillType) {
                case 'solid':
                    outText += '<a:solidFill><a:srgbClr val="' + colorVal + '">' + internalElements + '</a:srgbClr></a:solidFill>';
                    break;
            }
        }

        return outText;
    },
    generatePptxOutTextXMLMarkup: function(text_info, slide_obj) {
        var out_obj = {};

        out_obj.font_size = '';
        out_obj.bold = '';
        out_obj.underline = '';
        out_obj.rpr_info = '';
        out_obj.char_spacing = '';

        if (typeof text_info == 'object') {
            if (text_info.bold) {
                out_obj.bold = ' b="1"';
            } // Endif.

            if (text_info.underline) {
                out_obj.underline = ' u="sng"';
            } // Endif.

            if (text_info.font_size) {
                out_obj.font_size = ' sz="' + text_info.font_size + '00"';
            } // Endif.

            if (text_info.char_spacing) {
                out_obj.char_spacing = ' spc="' + (text_info.char_spacing * 100) + '"';
                // must also disable kerning; otherwise text won't actually expand
                out_obj.char_spacing += ' kern="0"';
            } // Endif.


            if (text_info.color) {
                out_obj.rpr_info += this.generatePptxColorSelectionXMLMarkup(text_info.color);

            } else if (slide_obj && slide_obj.color) {
                out_obj.rpr_info += this.generatePptxColorSelectionXMLMarkup(slide_obj.color);
            } // Endif.

            if (text_info.font_face) {
                out_obj.rpr_info += '<a:latin typeface="' + text_info.font_face + '" pitchFamily="34" charset="0"/><a:cs typeface="' + text_info.font_face + '" pitchFamily="34" charset="0"/>';
            } // Endif.

        } else {
            if (slide_obj && slide_obj.color) {
                out_obj.rpr_info += this.generatePptxColorSelectionXMLMarkup(slide_obj.color);
            } // Endif.
        } // Endif.

        if (out_obj.rpr_info != '')
            out_obj.rpr_info += '</a:rPr>';

        return out_obj;
    },
    generatePptxOutTextCommandXMLMarkup: function(text_info, text_string, slide_obj) {
        var area_opt_data = this.generatePptxOutTextXMLMarkup(text_info, slide_obj);       
        var outData = '<a:r><a:rPr lang="en-US"' + area_opt_data.font_size + area_opt_data.bold + area_opt_data.underline + area_opt_data.char_spacing + ' dirty="0" smtClean="0"' + (area_opt_data.rpr_info != '' ? ('>' + area_opt_data.rpr_info) : '/>') + '<a:t>';

        // Automatic support for newline - split it into multi-p:
        var parsedText = text_string.split("\n");
        if (parsedText.length > 1) {
            var outTextData = '';
            for (var i = 0, total_size_i = parsedText.length; i < total_size_i; i++) {
                outTextData += outData + Ext.String.htmlEncode(parsedText[i]);

                if ((i + 1) < total_size_i) {
                    outTextData += '</a:t></a:r></a:p><a:p>';
                } // Endif.
            } // End of for loop.

            outData = outTextData;

        } else {
            outData += Ext.String.htmlEncode(text_string);
        } // Endif.

        var outBreakP = '';
        if (text_info.breakLine) {
            outBreakP += '</a:p><a:p>';
        } // Endif.

        return outData + '</a:t></a:r>' + outBreakP;
    },
    parseSmartNumber: function(in_data_val, max_value, def_value, auto_val, mul_val) {
        if (typeof in_data_val == 'undefined') {
            return (typeof def_value == 'number') ? def_value : 0;
        }

        if (in_data_val == '') {
            in_data_val = 0;
        }

        if (typeof in_data_val == 'string' && !isNaN(in_data_val)) {
            in_data_val = parseInt(in_data_val, 10);
        }

        var realNum = mul_val ? in_data_val * mul_val : in_data_val;

        if (typeof in_data_val == 'string') {
            if (in_data_val.indexOf('%') != -1) {
                var realMax = (typeof max_value == 'number') ? max_value : 0;
                if (realMax <= 0) return 0;

                var realVal = parseInt(in_data_val, 10);
                return Math.round((realMax / 100) * realVal);
            }

            if (in_data_val.indexOf('#') != -1) {
                var realVal = parseInt(in_data_val, 10);
                return realMax;
            }

            var realAuto = (typeof auto_val == 'number') ? auto_val : 0;

            if (in_data_val == '*') {
                return realAuto;
            }

            if (in_data_val == 'c') {
                return Math.round(realAuto / 2);
            }

            return (typeof def_value == 'number') ? def_value : 0;
        }

        if (typeof in_data_val == 'number') {
            return realNum;
        }

        return (typeof def_value == 'number') ? def_value : 0;
    },
    generatePptxEffectsXMLMarkup: function(effectData, effectName) {
        var outData = '<a:' + effectName + ' ';
        var color = effectData.color || 'black';
        var alphaPer = 60;
        var algnData = '';
        var blurRad = 50800;
        var dist = 38100;
        var dir = 13500000;

        if (typeof effectData.transparency == 'number') {
            alphaPer = effectData.transparency;
        } // Endif.

        if ((alphaPer > 100) || (alphaPer < 0))
            alphaPer = 60;

        alphaPer = (100 - alphaPer) * 1000;

        if (effectData.align) {
            if (effectData.align.top)
                algnData += 't';

            if (effectData.align.bottom)
                algnData += 'b';

            if (effectData.align.left)
                algnData += 'l';

            if (effectData.align.right)
                algnData += 'r';
        } // Endif.

        if (algnData == '')
            algnData = 'br';

        // Size
        // Blur
        // Angle
        // Distance
        // BMK_TODO:

        outData += ' blurRad="' + blurRad + '" dist="' + dist + '" dir="' + dir + '" algn="' + algnData + '" rotWithShape="0"';

        // sx="24000" sy="24000"

        outData += '><a:prstClr val="' + color + '"><a:alpha val="' + alphaPer + '"/></a:prstClr>';
        return outData + '</a:' + effectName + '>';
    },
    generatePptxBodyPropXMLMarkup: function(objOptions) {
        var bodyProperties = '<a:bodyPr';

        if (objOptions && objOptions.bodyProp) {
            // Set anchorPoints bottom, center or top:
            if (objOptions.bodyProp.anchor) {
                bodyProperties += ' anchor="' + objOptions.bodyProp.anchor + '"';
            }

            if (objOptions.bodyProp.anchorCtr) {
                bodyProperties += ' anchorCtr="' + objOptions.bodyProp.anchorCtr + '"';
            }

            // Enable or disable textwrapping none or square:
            if (objOptions.bodyProp.wrap) {
                bodyProperties += ' wrap="' + objOptions.bodyProp.wrap + '"';

            } else {
                bodyProperties += ' wrap="square"';
            }

            // Box margins(padding):
            // todo: I should pass a better value as the auto_val parameter of parseSmartNumber().
            if (objOptions.bodyProp.bIns) {
                bodyProperties += ' bIns="' + this.parseSmartNumber(objOptions.bodyProp.bIns, 6858000, 369332, 6858000, 10000) + '"';
            }

            if (objOptions.bodyProp.lIns) {
                bodyProperties += ' lIns="' + this.parseSmartNumber(objOptions.bodyProp.lIns, 9144000, 2819400, 9144000, 10000) + '"';
            }

            if (objOptions.bodyProp.rIns) {
                bodyProperties += ' rIns="' + this.parseSmartNumber(objOptions.bodyProp.rIns, 9144000, 2819400, 9144000, 10000) + '"';
            }

            if (objOptions.bodyProp.tIns) {
                bodyProperties += ' tIns="' + this.parseSmartNumber(objOptions.bodyProp.tIns, 6858000, 369332, 6858000, 10000) + '"';
            } 

            bodyProperties += ' rtlCol="0">';

            if (objOptions.bodyProp.autoFit !== false) {
                bodyProperties += '<a:spAutoFit/>';
            }

            bodyProperties += '</a:bodyPr>';

            // Default:
        } else {
            bodyProperties += ' wrap="square" rtlCol="0"></a:bodyPr>';
        } 

        return bodyProperties;
    },
    
	
	generateTableXML: function(rows, options) {
		options = options || {};
		
		var me = this,
			EMU = 914400,
			i = 0,
			j = 0,			
			rl = rows.length,
			cl, graphicFrameElement, tableElement, tableGridElement, rowElement, cellElement;
		
		if (options.columnWidth === undefined) {
		  options.columnWidth = 8 / (rows[0].length) * EMU
		}
		graphicFrameElement = me.generateGraphicFrameElement(options);
		tableElement = new XElement(openXml.A.tbl,
			new XElement(openXml.A.tblPr,
				new XAttribute("firstRow", "1"),
				new XAttribute("bandRow", "1"),
				new XElement(openXml.A.tableStyleId, "{3C2FFA5D-87B4-456A-9821-1D502468CF0F}")
			)
		);
		tableGridElement = me.generateTableGridElement(rows[0].length, options.columnWidth);	
		tableElement.add(tableGridElement)
		
		for (i; i < rl; i++) {
			cl = rows[i].length;
			rowElement = me.generateTableRowElement(options.rowHeight);
			for (j = 0; j < cl; j++) {
				cellElement = me.generateTableCellElement(rows[i][j])
				rowElement.add(cellElement);
			}
			tableElement.add(rowElement);
		}
		
		graphicFrameElement.add(new XElement(openXml.A.graphic,
			new XElement(openXml.A.graphicData,
				new XAttribute("uri", "http://schemas.openxmlformats.org/drawingml/2006/table"),
				tableElement
			)
		));
		
		return graphicFrameElement;		
	},
	generateTableGridElement: function (len, width) {
		var element = new XElement(openXml.A.tblGrid),		
			i = 0;
		for (i; i < len; i++) {
			element.add(new XElement(openXml.A.gridCol,
				new XAttribute("w", width || "0")
			));
		}
		return element;
		
	},
	generateGraphicFrameElement: function (options) {
		return new XElement(openXml.P.graphicFrame,
			new XElement(openXml.P.nvGraphicFramePr,
				new XElement(openXml.P.cNvPr,
					new XAttribute("id", "6"),
					new XAttribute("name", "Table 5")
				),
				new XElement(openXml.P.cNvGraphicFramePr,
					new XElement(openXml.A.graphicFrameLocks,
						new XAttribute("noGrp", "1")
					)
				),
				new XElement(openXml.P.nvPr,
					new XElement(openXml.P.extLst,
						new XElement(openXml.P.ext,
							new XAttribute("uri", "{D42A27DB-BD31-4B8C-83A1-F6EECF244321}"),
							new XElement(openXml.P14.modId,
								new XAttribute(XNamespace.xmlns + "p14", openXml.p14Ns.namespaceName),
								new XAttribute("val", "1579011935")
							)
						)
					)
				)
			),
			new XElement(openXml.P.xfrm,
				new XElement(openXml.A.off,
					new XAttribute("x", options.x || "1524000"),
					new XAttribute("y", options.y || "1397000")
				),
				new XElement(openXml.A.ext,
					new XAttribute("cx", options.cx || "6096000"),
					new XAttribute("cy", options.cy || "1483360")
				)
			)
		);
	},
	generateTableRowElement: function (height) {
		return new XElement(openXml.A.tr,
			new XAttribute("h", height || "0")
		);			
	},
	generateTableCellElement: function (value) {
		return new XElement(openXml.A.tc,
			new XElement(openXml.A.txBody,
				new XElement(openXml.A.bodyPr),
				new XElement(openXml.A.lstStyle),
				new XElement(openXml.A.p,
					new XElement(openXml.A.r,
						new XElement(openXml.A.rPr,
							new XAttribute("lang", "en-US"),
							new XAttribute("dirty", "0"),
							new XAttribute("smtClean", "0")
						),
						new XElement(openXml.A.t, value)
					),
					new XElement(openXml.A.endParaRPr,
						new XAttribute("lang", "en-US"),
						new XAttribute("dirty", "0")
					)
				)
			),
			new XElement(openXml.A.tcPr)
		);
	},
	
	generateEffectElement: function (effects) {
		var element = new XElement(openXml.A.effectLst),
			i = 0,
			el = effects.length,
			effect, effectElement;
		
		for (i; i < el; i++) {
			effect = effects[i].type
			switch (effect) {
				case 'outerShadow':
					effectElement = this.generatePptxEffectsElement(effects[i], 'outerShdw');
					break;

				case 'innerShadow':
					effectElement = this.generatePptxEffectsElement(effects[i], 'innerShdw');
					break;
			}
			element.add(effectElement);
		}
		return element;
	},
	
	generateShapeXML: function (positionCfg, config, index) {
		var me = this,
			x = positionCfg.x,
			y = positionCfg.y,
			cx = positionCfg.cx,
			cy = positionCfg.cy,
			type = config.type, 
			shapeType = positionCfg.shapeType,
			locationAttr = positionCfg.locationAttr
			effectsList = '',
			i = 0,
			slide = config.slide,
			j, t, o, p, pl, element, spPrElement, fillElement, lineElement, lineAttr, effectElement, 
			styleDataElement, txBodyElement, paragraphElements, endParaRPRElement, paragraphElement, text;

		if (shapeType == null) {
			shapeType = this.getShapeInfo(null);
		}

		if (type == 'cxn') {
			element = new XElement(openXml.P.cxnSp,
				new XElement(openXml.P.nvCxnSpPr,
					new XElement(openXml.cNvPr,
						new XAttribute("id", (index + 2)),
						new XAttribute("name", "Object " + (index + 1))
					)
				)
			)
		} else {
			element = new XElement(openXml.P.sp, 
				new XElement(openXml.P.nvSpPr,
					new XElement(openXml.cNvPr,
						new XAttribute("id", (index + 2)),
						new XAttribute("name", "Object " + (index + 1))
					),
					new XElement(openXml.P.cNvSpPr,
						new XAttribute("txBox", "1")
					),
					new XElement(openXml.P.nvPr)
				)
			)			
		}
		
		spPrElement = new XElement(openXml.P.spPr,
			new XElement(openXml.A.xfrm,
				locationAttr,
				new XElement(openXml.A.off,
					new XAttribute("x", x),
					new XAttribute("y", y)
				),
				new XElement(openXml.A.ext,
					new XAttribute("cx", cx),
					new XAttribute("cy", cy)
				)
			),
			new XElement(openXml.A.prstGeom,
				new XAttribute("prst", shapeType.name),
				new XElement(openXml.A.avLst)
			)
		);
		
		if (config.options) {
			if (config.options.fill) {
				fillElement = me.generatePptxColorSelectionElement(config.options.fill, false);				
			} else {
				fillElement = new XElement(openXml.A.noFill)
			}
			spPrElement.add(fillElement);
			fillElement = null;
			
			if (config.options.line) {
				if (config.options.line_size) {
					lineAttr  = new XAttribute("w", (config.options.line_size * 12700));
				}
				lineElement = new XElement(openXml.A.ln, lineAttr);
								
				fillElement = this.generatePptxColorSelectionElement(config.options.line, false);
				lineElement.add(fillElement);
				
				if (config.options.line_head) {
					lineElement.add(new XElement(openXml.A.headEnd,
						new XAttribute("type", config.options.line_head)
					))
				}

				if (config.options.line_tail) {
					lineElement.add(new XElement(openXml.A.tailEnd,
						new XAttribute("type", config.options.line_tail)
					));
				}
				spPrElement.add(lineElement);
			}

		} else {
			fillElement = new XElement(openXml.A.noFill);
		}

		if (config.options.effects) {
			effectElement = this.generateEffectElement(config.options.effects);
			spPrElement.add(effectElement);
		}
		
		element.add(spPrElement);
		
		if (styleDataElement) {
			element.add(new XElement(openXml.P.style, styleDataElement));			
		}		
		bodyPropElement = this.generatePptxBodyPropElement(config.options);
		txBodyElement = new XElement(openXml.P.txBody, 
			bodyPropElement, 
			new XElement(openXml.A.lstStyle)
		);
		
		text = Ext.Array.from(config.text);
		tl = text.length;
		paragraphElements = [];
		for (i = 0; i < tl; i++) {
			t = text[i];
			o = config.options;			
			if (!Ext.isString(t)) {				
				t = t.text;
				o = t.options
			}
			
			p = t.split("\n");
			pl = p.length;
			for (j = 0; j < pl; j++) {			
				paragraphElement = this.generateParagraphElement(o, p[j], slide)
				
				if (o.breakLine) {
					paragraphElement.push(paragraphElement);
					paragraphElement = this.generateParagraphElement(o, "", slide);
				}
				
				if ((j + 1) == pl) {
					endParaRPRElement = new XElement(openXml.A.endParaRPr,
						new XAttribute("lang", "en-US")
					)
					if (o && o.font_size) {
						endParaRPRElement.add(new XAttribute("sz", o.font_size + "00"));
					}
					endParaRPRElement.add(new XAttribute("dirty", "0"));
					paragraphElement.add(endParaRPRElement);
				}
				
				paragraphElements.push(paragraphElement);
			}
		}
				
		pl = paragraphElements
		for (i = 0; i < pl; i++) {
			txBodyElement.add(paragraphElements[i])
		}
		element.add(txBodyElement);
		
		return element; 
	},
	//Still needs to be updated to new methodology
	generateParagraphXML: function (config) {
		if (shapeType == null) shapeType = this.getShapeInfo(null);

				outString += '<p:sp><p:nvSpPr>';
				outString += '<p:cNvPr id="' + (i + 2) + '" name="Object ' + (i + 1) + '"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>';
				outString += '<p:spPr>';

				outString += '<a:xfrm' + locationAttr + '>';

				outString += '<a:off x="' + x + '" y="' + y + '"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm><a:prstGeom prst="' + shapeType.name + '"><a:avLst/></a:prstGeom>';

				if (config.options) {
					if (config.options.fill) {
						outString += this.generatePptxColorSelectionXMLMarkup(config.options.fill);

					} else {
						outString += '<a:noFill/>';
					}

					if (config.options.line) {
						outString += '<a:ln>';
						outString += this.generatePptxColorSelectionXMLMarkup(config.options.line);

						if (config.options.line_head) {
							outString += '<a:headEnd type="' + config.options.line_head + '"/>';
						}

						if (config.options.line_tail) {
							outString += '<a:tailEnd type="' + config.options.line_tail + '"/>';
						}

						outString += '</a:ln>';
					} 

				} else {
					outString += '<a:noFill/>';
				}

				outString += '</p:spPr>';

				if (styleData != '') {
					outString += '<p:style>' + styleData + '</p:style>';
				}

				outString += '<p:txBody><a:bodyPr wrap="square" rtlCol="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/>';

				for (var j = 0, total_size_j = config.data.length; j < total_size_j; j++) {
					if (config.data[j]) {
						moreStylesAttr = '';
						moreStyles = '';

						if (config.data[j].options) {
							if (config.data[j].options.align) {
								switch (config.data[j].options.align) {
									case 'right':
										moreStylesAttr += ' algn="r"';
										break;

									case 'center':
										moreStylesAttr += ' algn="ctr"';
										break;

									case 'justify':
										moreStylesAttr += ' algn="just"';
										break;
								}
							}

							if (config.data[j].options.indentLevel > 0) {
								moreStylesAttr += ' lvl="' + config.data[j].options.indentLevel + '"';
							}

							if (config.data[j].options.listType == 'number') {
								moreStyles += '<a:buFont typeface="+mj-lt"/><a:buAutoNum type="arabicPeriod"/>';
							}
						}

						if (moreStyles != '') {
							outStyles = '<a:pPr' + moreStylesAttr + '>' + moreStyles + '</a:pPr>';

						} else if (moreStylesAttr != '') {
							outStyles = '<a:pPr' + moreStylesAttr + '/>';
						}

						outString += '<a:p>' + outStyles;

						// if ( typeof config.data[j].text == 'string' ) {
						outString += this.generatePptxOutTextCommandXMLMarkup(config.data[j].options, config.data[j].text, data.slide);
					}
				}

				var font_size = '';
				if (config.options && config.options.font_size) {
					font_size = ' sz="' + config.options.font_size + '00"';
				}

				outString += '<a:endParaRPr lang="en-US"' + font_size + ' dirty="0"/></a:p>';
				outString += '</p:txBody>';

				outString += '</p:sp>';
	},
	generateImageXML: function (positionCfg, config, index) {
		var cNvrPrElement = new XElement(openXml.P.cNvPr,
				new XAttribute("id", (index + 2)),
				new XAttribute("name", "Object " + (index + 1))
			),
			element;
		
		if (config.link_rel_id) {
			cNvrPrElement.add(new XElement(openXml.A.hlinkClick,
				new XAttribute(openXml.R.id, "rId" + config.link_rel_id)
			));
		}
		
		element = new XElement(openXml.P.pic,
			new XElement(openXml.P.nvPicPr,
				cNvrPrElement,
				new XElement(openXml.P.cNvPicPr,
					new XElement(openXMl.A.picLocks,
						new XAttribute("noChangeAspect", "1")
					)
				),
				new XElement(openXml.P.nvPr)
			),
			new XElement(openXml.P.blipFill,
				new XElement(openXMl.A.blip,
					new XAttribute(openXml.R.embed, "rId" + config.rel_id),
					new XAttribute("cstate", "print")
				),
				new XElement(openXml.A.stretch,
					new XElement(openXml.A.fillRect)
				)
			),
			new XElement(openXml.P.spPr,
				new XElement(openXml.A.xfrm,
					positionCfg.locationAttr,
					new XElement(openXml.A.off,
						new XAttribute("x", positionCfg.x),
						new XAttribute("y", positionCfg.y)
					),
					new XElement(openXml.A.ext,
						new XAttribute("cx", positionCfg.cx),
						new XAttribute("cy", positionCfg.cy)
					)
				),
				new XElement(openXml.A.prstGeom,
					new XAttribute("prst", "rect"),
					new XElement(openXml.A.avLst)
				)
			)
		);
			
		return element;
	},
	generateChartXML: function (config) {		
		if (config.renderType === 'pie') {
			return new XElement(openXml.P.graphicFrame,
				new XElement(openXml.P.nvGraphicFramePr,
					new XElement(openXml.P.cNvPr,
						new XAttribute("id", "20"),
						new XAttribute("name", "OfficeChart 19")
					),
					new XElement(openXml.P.cNvGraphicFramePr),
					new XElement(openXml.P.nvPr,
						new XElement(openXml.P.extLst,
							new XElement(openXml.P.ext,
								new XAttribute("uri", "{D42A27DB-BD31-4B8C-83A1-F6EECF244321}"),
								new XElement(openXml.P14.modId,
									new XAttribute(XNamespace.xmlns + "p14", openXml.p14Ns.namespaceName),
									new XAttribute("val", "4198609065")
								)
							)
						)
					)
				),
				new XElement(openXml.P.xfrm,
					new XElement(openXml.A.off,
						new XAttribute("x","1524000"),
						new XAttribute("y", "1397000")
					),
					new XElement(openXml.A.ext,
						new XAttribute("cx", "6096000"),
						new XAttribute("cy", "4064000")
					)
				),
				new XElement(openXml.A.graphic,
					new XElement(openXml.A.graphicData,
						new XAttribute("uri", "http://schemas.openxmlformats.org/drawingml/2006/chart"),
						new XElement(openXml.C.chart,
							new XAttribute(XNamespace.xmlns + "c", openXml.cNs.namespaceName),
							new XAttribute(XNamespace.xmlns + "r", openXml.rNs.namespaceName),
							new XAttribute(openXml.R.id, "rId2")
						)
					)
				)
			);
		} else if (config.renderType === 'column') {
			return new XElement(openXml.P.graphicFrame,
				new XElement(openXml.P.nvGraphicFramePr,
					new XElement(openXml.P.cNvPr,
						new XAttribute("id", "4"),
						new XAttribute("name", "OfficeChart 3")
					),
					new XElement(openXml.P.cNvGraphicFramePr),
					new XElement(openXml.P.nvPr,
						new XElement(openXml.P.extLst,
							new XElement(openXml.P.ext,
								new XAttribute("uri", "{D42A27DB-BD31-4B8C-83A1-F6EECF244321}"),
								new XElement(openXml.P14.modId,
									new XAttribute(XNamespace.xmlns + "p14", openXml.p14Ns.namespaceName),
									new XAttribute("val", "1256887135")
								)
							)
						)
					)
				),
				new XElement(openXml.P.xfrm,
					new XElement(openXml.A.off,
						new XAttribute("x","1524000"),
						new XAttribute("y", "1397000")
					),
					new XElement(openXml.A.ext,
						new XAttribute("cx", "6096000"),
						new XAttribute("cy", "4064000")
					)
				),
				new XElement(openXml.A.graphic,
					new XElement(openXml.A.graphicData,
						new XAttribute("uri", "http://schemas.openxmlformats.org/drawingml/2006/chart"),
						new XElement(openXml.C.chart,
							new XAttribute(XNamespace.xmlns + "c", openXml.cNs.namespaceName),
							new XAttribute(XNamespace.xmlns + "r", openXml.rNs.namespaceName),
							new XAttribute(openXml.R.id, "rId2")
						)
					)
				)
			);
		}
	},
		
	generateParagraphElement: function (options, text, slide, isLastParagraph) {
		var paraPropElement = new XElement(openXml.A.pPr),			
			runElement, paragraphElement, endParaRPRElement;
			
		if (options) {
			if (options.align) {
				switch (options.align) {
					case 'right':
						paraPropElement.add(new XAttribute("algn", "r"));
						break;

					case 'center':
						paraPropElement.add(new XAttribute("algn", "ctr"));
						break;

					case 'justify':
						paraPropElement.add(new XAttribute("algn", "just"));
						break;
				}
			}

			if (options.indentLevel > 0) {
				paraPropElement.add(new XAttribute("lvl", options.indentLevel));
			}
		}
		
		runElement = this.generateRunElement(o, Ext.String.htmlEncode(text), slide)
		
		paragraphElement = new XElement(openXml.A.p, paraPropElement, runElement)
		
		return paragraphElement;
	},
	generateRunElement: function(options, text, slide) {
        var rPrElement = this.generateRunPropertyElement(options, slide),
			i = 0,
			textElement, parsedText, ts;
		      
        textElement = new XElement(openXml.A.t, Ext.String.htmlEncode(text));
       	
        return new XElement(openXml.A.r, rPrElement, textElement)
    },
	generateRunPropertyElement: function(options, slide) {
        var element = new XElement(openXml.A.rPr),
			fillElement;

        if (typeof options == 'object') {
            if (options.font_size) {
               element.add(new XAttribute("sz", options.font_size + "00"));
            }
			if (options.bold) {
                element.add(new XAttribute("b", "1"));
            }
            if (options.underline) {
                element.add(new XAttribute("u", "sng"));
            }
            if (options.char_spacing) {
                 element.add(new XAttribute("spc", (options.char_spacing * 100)));
                // must also disable kerning; otherwise text won't actually expand
                 element.add(new XAttribute("kern", "0"));
            }
			element.add(new XAttribute("dirty", "0"), new XAttribute("smtClean", "0"));

            if (options.color) {
                fillElement = this.generatePptxColorSelectionElement(options.color, false);
				element.add(fillElement);

            } else if (slide && slide.color) {
               fillElement = this.generatePptxColorSelectionElement(slide.color, false);
			   element.add(fillElement);
            } 

            if (options.font_face) {
				element.add(new XElement(openXml.A.latin,
						new XAttribute("typeface", options.font_face),
						new XAttribute("pitchFamily", "34"),
						new XAttribute("charset", "0")
					),
					new XElement(openXml.A.cs,
						new XAttribute("typeface", options.font_face),
						new XAttribute("pitchFamily", "34"),
						new XAttribute("charset", "0")
					)
				)				
            }

        } else {
            if (slide && slide.color) {
               fillElement = this.generatePptxColorSelectionElement(slide.color, false);
			   element.add(fillElement);
            }
        }

        return element;
    },
	generatePptxBodyPropElement: function(config) {
        var element = new XElement(openXml.A.bodyPr);
			
		if (config && config.bodyProp) {
			// Set anchorPoints bottom, center or top:
            if (config.bodyProp.anchor) {
				element.add(new XAttribute("anchor", config.bodyProp.anchor));
			}
			if (config.bodyProp.anchorCtr) {
				element.add(new XAttribute("anchorCtr", config.bodyProp.anchorCtr));
            }

            // Enable or disable textwrapping none or square:
            if (config.bodyProp.wrap) {
				element.add(new XAttribute("wrap", config.bodyProp.wrap));
            } else {
				element.add(new XAttribute("wrap", "square"));
            }

            // Box margins(padding):           
            if (config.bodyProp.bIns) {
                element.add(new XAttribute("bIns", this.parseSmartNumber(config.bodyProp.bIns, 6858000, 369332, 6858000, 10000)));
            }

            if (config.bodyProp.lIns) {
                element.add(new XAttribute("lIns", this.parseSmartNumber(config.bodyProp.lIns, 9144000, 2819400, 9144000, 10000)));
            }

            if (config.bodyProp.rIns) {
                element.add(new XAttribute("rIns", this.parseSmartNumber(config.bodyProp.rIns, 9144000, 2819400, 9144000, 10000)));
            }

            if (config.bodyProp.tIns) {
               element.add(new XAttribute("tIns", this.parseSmartNumber(config.bodyProp.tIns, 6858000, 369332, 6858000, 10000)));
            } 

             element.add(new XAttribute("rtlCol", "0"));

            if (config.bodyProp.autoFit !== false) {
                element.add(new XElement(openXml.A.spAutoFit));
            }
		} else {
			element.add(new XAttribute("wrap", "square"), new XAttribute("rtlCol", "0"))
		}
		
		return element;
    },
	generatePptxEffectsElement: function(config, effectName) {
        var color = config.color || 'black',
			alphaPer = 60,
			blurRad = 50800,
			dist = 38100,
			dir = 13500000,
			algnData = '',
			element;
		
		
        if (typeof config.transparency == 'number') {
            alphaPer = config.transparency;
        }

        if ((alphaPer > 100) || (alphaPer < 0))
            alphaPer = 60;

        alphaPer = (100 - alphaPer) * 1000;

        if (config.align) {
            if (config.align.top)
                algnData += 't';

            if (config.align.bottom)
                algnData += 'b';

            if (config.align.left)
                algnData += 'l';

            if (config.align.right)
                algnData += 'r';
        }

        if (algnData == '') {
		    algnData = 'br';
		}

		return new XElement(openXml.A[effectName],
			new XAttribute("blurRad", blurRad),
			new XAttribute("dist", dist),
			new XAttribute("dir", dir),
			new XAttribute("algn", algnData),
			new XAttribute("rotWithShape", "0"),
			new XElement(openXml.A.prstClr,
				new XAttribute("val", color),
				new XElement(openXml.A.alpha,
					new XAttribute("val", alphaPer)
				)
			)
		);
       
    },
	generatePptxColorSelectionElement: function(colorCfg, backgroundCfg) {
        var fillType = 'solid',
			elements, colorSelectionElement;
		
		if (backgroundCfg) {
			elements = this.generatePptxColorSelectionElement(backgroundCfg, false)
			colorSelectionElement = new XElement(openXml.P.bg,
				new XElement(openXml.P.bgPr,
					elements,
					new XElement(openXml.A.effectLst)
				)
			);
		}
		if (colorCfg) {
			if (Ext.isString(colorCfg)) {
				color = colorCfg;
			} else {
				if (colorCfg.type) {
					fillType = colorCfg.type;
				}
				if (colorCfg.color) {
					color = colorCfg.color;
				}
				if (colorCfg.alpha) {
					elements = new XElement(openXml.A.alpha,
						new XAttribute("val", ((100 - colorCfg.alpha) + "000"))
					);
				}
			}
			if (fillType == 'solid') {
				colorSelectionElement = new XElement(openXml.A.solidFill,
					new XElement(openXml.A.srgbClr,
						new XAttribute("val", color),
						elements
					)
				);
			}
			
		}
		return colorSelectionElement;        
    },
	generateSlideDataComponentXML: function (config, index) {
		var x = 0,
			y = 0;
			cx = 2819400,
			cy = 369332,
			shapeType = null,
			locationAttr, rotateValue, element, positionCfg;
	
		if (config.options) {
			if (typeof config.options.cx != 'undefined') {
				if (config.options.cx) {
					cx = this.parseSmartNumber(config.options.cx, 9144000, 2819400, 9144000, 10000);

				} else {
					cx = 1;
				}
			}

			if (typeof config.options.cy != 'undefined') {
				if (config.options.cy) {
					cy = this.parseSmartNumber(config.options.cy, 6858000, 369332, 6858000, 10000);

				} else {
					cy = 1;
				}
			}

			if (config.options.x) {
				x = this.parseSmartNumber(config.options.x, 9144000, 0, 9144000 - cx, 10000);
			}

			if (config.options.y) {
				y = this.parseSmartNumber(config.options.y, 6858000, 0, 6858000 - cy, 10000);
			}

			if (config.options.shape) {
				shapeType = this.getShapeInfo(config.options.shape);
			}

			if (config.options.flip_vertical) {
				locationAttr = new XAttribute("flipV", "1");
			}

			if (config.options.rotate) {
				rotateValue = config.options.rotate > 360 ? (config.options.rotate - 360) : config.options.rotate;
				rotateValue *= 60000;
				locationAttr = new XAttribute("rot", rotateValue);
			}
		}
		
		positionCfg = Ext.apply({}, {
			x: x,
			y: y,
			cx: cx,
			cy: cy,
			shapeType: shapeType,
			locationAttr: locationAttr,
			rotateValue: rotateValue
		});
				
		switch (config.type) {			
			case 'table':
				element = this.generateTableXML(config.data, config.options);
				break;
			case 'chart':
				element = this.generateChartXML(config);
				break;
			case 'text':
			case 'cxn':
				element = this.generateShapeXML(positionCfg, config, index)
				break;						
			case 'image':
				element = this.generateImageXML(positionCfg, config, index);
				break;			
			case 'p':
				element = this.generateParagraphXML(config);
				break;
		}
		return element;
	},
	
	generatePptxPropsXML: function() {
       	return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"), 
			new XElement(
				new XName(openXml.pNs, "presentationPr"),
				new XAttribute(XNamespace.xmlns + "a", openXml.aNs.namespaceName),
				new XAttribute(XNamespace.xmlns + "r", openXml.rNs.namespaceName),
				new XAttribute(XNamespace.xmlns + "p", openXml.pNs.namespaceName),
				new XElement(openXml.P.extLst,
					new XElement(openXml.P.ext,
						new XAttribute("uri", "{E76CE94A-603C-4142-B9EB-6D1370010A27}"),
						new XElement(
							new XName(openXml.p14Ns, "discardImageEditData"),
							new XAttribute(XNamespace.xmlns + "p14", openXml.p14Ns),
							new XAttribute("val", "0")
						)
					),
					new XElement(openXml.P.ext,
						new XAttribute("uri", "{D31A062A-798A-4329-ABDD-BBA856620510}"),
						new XElement(
							new XName(openXml.p14Ns, "defaultImageDpi"),
							new XAttribute(XNamespace.xmlns + "p14", openXml.p14Ns),
							new XAttribute("val", "220")
						)
					),
					new XElement(openXml.P.ext,
						new XAttribute("uri", "{FD5EFAAD-0ECE-453E-9831-46B23BE46B34}"),
						new XElement(
							new XName(openXml.p14Ns, "chartTrackingRefBased"),
							new XAttribute(XNamespace.xmlns + "p14", openXml.p14Ns),
							new XAttribute("val", "1")
						)
					)
				)
			)
		);
    },
	generatePptxStylesXML: function() {
        return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"), 
			new XElement(openXml.A.tblStyleLst, 
				new XAttribute(XNamespace.xmlns + "a", openXml.aNs.namespaceName),
				new XAttribute("def", "{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}")
			)
		);
    },
	generatePptxViewPropsXML: function () {
		return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"),
			new XElement(openXml.P.viewPr,
				new XAttribute(XNamespace.xmlns + "a", openXml.aNs.namespaceName),
				new XAttribute(XNamespace.xmlns + "r", openXml.rNs.namespaceName),
				new XAttribute(XNamespace.xmlns + "p", openXml.pNs.namespaceName),
				new XElement(openXml.P.normalViewPr,
					new XElement(openXml.P.restoredLeft,
						new XAttribute("sz", "15620")
					),
					new XElement(openXml.P.restoredTop,
						new XAttribute("sz", "94660")
					)
				),
				new XElement(openXml.P.slideViewPr,
					new XElement(openXml.P.cSldViewPr,
						new XElement(openXml.P.cViewPr,
							new XAttribute("varScale", "1"),
							new XElement(openXml.P.scale,
								new XElement(openXml.A.sx,
									new XAttribute("n", "64"),
									new XAttribute("d", "100")
								),
								new XElement(openXml.A.sy,
									new XAttribute("n", "64"),
									new XAttribute("d", "100")
								)
							),
							new XElement(openXml.P.origin,
								new XAttribute("x", "-1392"),
								new XAttribute("y", "-96")
							)
						),
						new XElement(openXml.P.guideLst,
							new XElement(openXml.P.guide,
								new XAttribute("orient", "horz"),
								new XAttribute("pos", "2160")
							),
							new XElement(openXml.P.guide,
								new XAttribute("pos", "2880")
							)
						)
					)
				),
				new XElement(openXml.P.notesTextViewPr, 
					new XElement(openXml.P.viewPr,
						new XElement(openXml.P.scale,
							new XElement(openXml.A.sx,
								new XAttribute("n", "100"),
								new XAttribute("d", "100")
							),
							new XElement(openXml.A.sy,
								new XAttribute("n", "100"),
								new XAttribute("d", "100")
							)
						),
						new XElement(openXml.P.origin,
							new XAttribute("x", "0"),
							new XAttribute("y", "0")
						)
					)
				),
				new XElement(openXml.P.gridSpacing,
					new XAttribute("cx", "78028800"),
					new XAttribute("cy", "78028800")
				)
			)
		);		
	},
	generatePptxLayoutXML: function () {
		return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"),
			new XElement(openXml.P.sldLayout,
				new XAttribute(XNamespace.xmlns + "a", openXml.aNs.namespaceName),
				new XAttribute(XNamespace.xmlns + "r", openXml.rNs.namespaceName),
				new XAttribute(XNamespace.xmlns + "p", openXml.pNs.namespaceName),
				new XAttribute("type", "title"),
				new XAttribute("preserve", "1"),
				new XElement(openXml.P.cSld,
					new XAttribute("name", "Title Slide"),
					new XElement(openXml.P.spTree,
						new XElement(openXml.P.nvGrpSpPr,
							new XElement(openXml.P.cNvPr,
								new XAttribute("id", "1"),
								new XAttribute("name", "")
							),
							new XElement(openXml.P.cNvGrpSpPr),
							new XElement(openXml.P.nvPr)
						),
						new XElement(openXml.P.grpSpPr,
							new XElement(openXml.A.xfrm,
								new XElement(openXml.A.off,
									new XAttribute("x", "0"),
									new XAttribute("y", "0")
								),
								new XElement(openXml.A.ext,
									new XAttribute("cx", "0"),
									new XAttribute("cy", "0")
								),
								new XElement(openXml.A.chOff,
									new XAttribute("x", "0"),
									new XAttribute("y", "0")
								),
								new XElement(openXml.A.chExt,
									new XAttribute("cx", "0"),
									new XAttribute("cy", "0")
								)
							)
						),
						new XElement(openXml.P.sp,
							new XElement(openXml.P.nvSpPr,
								new XElement(openXml.P.cNvPr,
									new XAttribute("id", "2"),
									new XAttribute("name", "Title 1")
								),
								new XElement(openXml.P.cNvSpPr,
									new XElement(openXml.A.spLocks,
										new XAttribute("noGrp", "1")
									)
								),
								new XElement(openXml.P.nvPr,
									new XElement(openXml.P.ph,
										new XAttribute("type", "ctrTitle")										
									)
								)
							),
							new XElement(openXml.P.spPr,
								new XElement(openXml.A.xfrm, 
									new XElement(openXml.A.off,
										new XAttribute("x", "685800"),
										new XAttribute("y", "2130425")
									),
									new XElement(openXml.A.ext,
										new XAttribute("cx", "7772400"),
										new XAttribute("cy", "1470025")
									)
								)
							),
							new XElement(openXml.P.txBody,
								new XElement(openXml.A.bodyPr),
								new XElement(openXml.A.lstStyle),
								new XElement(openXml.A.p,
									new XElement(openXml.A.r,
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "Click to edit Master title style")
									),
									new XElement(openXml.A.endParaRPr,
										new XAttribute("lang", "en-US")
									)
								)
							)
						),
						new XElement(openXml.P.sp,
							new XElement(openXml.P.nvSpPr,
								new XElement(openXml.P.cNvPr,
									new XAttribute("id", "3"),
									new XAttribute("name", "Subtitle 2")
								),
								new XElement(openXml.P.cNvSpPr,
									new XElement(openXml.A.spLocks,
										new XAttribute("noGrp", "1")
									)
								),
								new XElement(openXml.P.nvPr,
									new XElement(openXml.P.ph,
										new XAttribute("type", "subTitle"),										
										new XAttribute("idx", "1")
									)
								)
							),
							new XElement(openXml.P.spPr,
								new XElement(openXml.A.xfrm, 
									new XElement(openXml.A.off,
										new XAttribute("x", "1371600"),
										new XAttribute("y", "3886200")
									),
									new XElement(openXml.A.ext,
										new XAttribute("cx", "6400800"),
										new XAttribute("cy", "1752600")
									)
								)
							),
							new XElement(openXml.P.txBody,
								new XElement(openXml.A.bodyPr),
								new XElement(openXml.A.lstStyle,
									new XElement(openXml.A.lvl1pPr,
										new XAttribute("marL", "0"),
										new XAttribute("indent", "0"),
										new XAttribute("algn", "ctr"),
										new XElement(openXml.A.buNone),
										new XElement(openXml.A.defRPr, 
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									),
									new XElement(openXml.A.lvl2pPr,
										new XAttribute("marL", "457200"),
										new XAttribute("indent", "0"),
										new XAttribute("algn", "ctr"),
										new XElement(openXml.A.buNone),
										new XElement(openXml.A.defRPr, 
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									),
									new XElement(openXml.A.lvl3pPr,
										new XAttribute("marL", "914400"),
										new XAttribute("indent", "0"),
										new XAttribute("algn", "ctr"),
										new XElement(openXml.A.buNone),
										new XElement(openXml.A.defRPr, 
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									),
									new XElement(openXml.A.lvl4pPr,
										new XAttribute("marL", "1371600"),
										new XAttribute("indent", "0"),
										new XAttribute("algn", "ctr"),
										new XElement(openXml.A.buNone),
										new XElement(openXml.A.defRPr, 
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									),
									new XElement(openXml.A.lvl5pPr,
										new XAttribute("marL", "1828800"),
										new XAttribute("indent", "0"),
										new XAttribute("algn", "ctr"),
										new XElement(openXml.A.buNone),
										new XElement(openXml.A.defRPr, 
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									),
									new XElement(openXml.A.lvl6pPr,
										new XAttribute("marL", "2286000"),
										new XAttribute("indent", "0"),
										new XAttribute("algn", "ctr"),
										new XElement(openXml.A.buNone),
										new XElement(openXml.A.defRPr, 
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									),
									new XElement(openXml.A.lvl7pPr,
										new XAttribute("marL", "2743200"),
										new XAttribute("indent", "0"),
										new XAttribute("algn", "ctr"),
										new XElement(openXml.A.buNone),
										new XElement(openXml.A.defRPr, 
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									),
									new XElement(openXml.A.lvl8pPr,
										new XAttribute("marL", "3200400"),
										new XAttribute("indent", "0"),
										new XAttribute("algn", "ctr"),
										new XElement(openXml.A.buNone),
										new XElement(openXml.A.defRPr, 
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									),
									new XElement(openXml.A.lvl9pPr,
										new XAttribute("marL", "3657600"),
										new XAttribute("indent", "0"),
										new XAttribute("algn", "ctr"),
										new XElement(openXml.A.buNone),
										new XElement(openXml.A.defRPr, 
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									)
								),
								new XElement(openXml.A.p,
									new XElement(openXml.A.r,
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "Click to edit Master subtitle style")
									),
									new XElement(openXml.A.endParaRPr,
										new XAttribute("lang", "en-US")
									)
								)
							)
						),
						new XElement(openXml.P.sp,
							new XElement(openXml.P.nvSpPr,
								new XElement(openXml.P.cNvPr,
									new XAttribute("id", "4"),
									new XAttribute("name", "Date Placeholder 3")
								),
								new XElement(openXml.P.cNvSpPr,
									new XElement(openXml.A.spLocks,
										new XAttribute("noGrp", "1")
									)
								),
								new XElement(openXml.P.nvPr,
									new XElement(openXml.P.ph,
										new XAttribute("type", "dt"),
										new XAttribute("sz", "half"),
										new XAttribute("idx", "10")
									)
								)
							),
							new XElement(openXml.P.spPr),
							new XElement(openXml.P.txBody,
								new XElement(openXml.A.bodyPr),
								new XElement(openXml.A.lstStyle),
								new XElement(openXml.A.p,
									new XElement(openXml.A.fld,
										new XAttribute("id", "{F8166F1F-CE9B-4651-A6AA-CD717754106B}"),
										new XAttribute("type", "datetimeFigureOut"),
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "6/13/2013")
									),
									new XElement(openXml.A.endParaRPr,
										new XAttribute("lang", "en-US")
									)
								)
							)
						),
						new XElement(openXml.P.sp,
							new XElement(openXml.P.nvSpPr,
								new XElement(openXml.P.cNvPr,
									new XAttribute("id", "5"),
									new XAttribute("name", "Footer Placeholder 4")
								),
								new XElement(openXml.P.cNvSpPr,
									new XElement(openXml.A.spLocks,
										new XAttribute("noGrp", "1")
									)
								),
								new XElement(openXml.P.nvPr,
									new XElement(openXml.P.ph,
										new XAttribute("type", "ftr"),
										new XAttribute("sz", "quarter"),
										new XAttribute("idx", "11")
									)
								)
							),
							new XElement(openXml.P.spPr),
							new XElement(openXml.P.txBody,
								new XElement(openXml.A.bodyPr),
								new XElement(openXml.A.lstStyle),
								new XElement(openXml.A.p,
									new XElement(openXml.A.endParaRPr,
										new XAttribute("lang", "en-US")
									)
								)
							)
						),
						new XElement(openXml.P.sp,
							new XElement(openXml.P.nvSpPr,
								new XElement(openXml.P.cNvPr,
									new XAttribute("id", "6"),
									new XAttribute("name", "Slide Number Placeholder 5")
								),
								new XElement(openXml.P.cNvSpPr,
									new XElement(openXml.A.spLocks,
										new XAttribute("noGrp", "1")
									)
								),
								new XElement(openXml.P.nvPr,
									new XElement(openXml.P.ph,
										new XAttribute("type", "sldNum"),
										new XAttribute("sz", "quarter"),
										new XAttribute("idx", "12")
									)
								)
							),
							new XElement(openXml.P.spPr),
							new XElement(openXml.P.txBody,
								new XElement(openXml.A.bodyPr),
								new XElement(openXml.A.lstStyle),
								new XElement(openXml.A.p,
									new XElement(openXml.A.fld,
										new XAttribute("id", "{F7021451-1387-4CA6-816F-3879F97B5CBC}"),
										new XAttribute("type", "slidenum"),
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "â¹#âº")
									),
									new XElement(openXml.A.endParaRPr,
										new XAttribute("lang", "en-US")
									)
								)
							)							
						)
					)
				),
				new XElement(openXml.P.clrMapOvr,
					new XElement(openXml.A.masterClrMapping)
				)
			)
		);	
	},
    generatePptxPresentationXML: function () {
		var me = this,
			slides = me.pages,
			sl = slides.length,
			i = 0,
			j = 0,
			presentationElement, tempElement, elementName;
		
		presentationElement = new XElement(openXml.P.presentation,
			new XAttribute(XNamespace.xmlns + "a", openXml.aNs.namespaceName),
			new XAttribute(XNamespace.xmlns + "r", openXml.rNs.namespaceName),
			new XAttribute(XNamespace.xmlns + "p", openXml.pNs.namespaceName),
			new XAttribute("saveSubsetFonts", "1"),
			new XElement(openXml.P.sldMasterIdLst,
				new XElement(openXml.P.sldMasterId,
					new XAttribute("id", "2147483648"),
					new XAttribute(openXml.R.id, "rId1")
				)
			)
		);
		tempElement = new XElement(openXml.P.sldIdLst);
		for (i; i < sl; i++) {
			tempElement.add(new XElement(openXml.P.sldId,
				new XAttribute("id", (i + 256)),
				new XAttribute(openXml.R.id, "rId" + (i + 2))
			));
		}
		presentationElement.add(tempElement,
			new XElement(openXml.P.sldSz, 
				new XAttribute("cx", "9144000"),
				new XAttribute("xy", "6858000"),
				new XAttribute("type", "screen4x3")
			),
			new XElement(openXml.P.notesSz, 
				new XAttribute("cx", "6858000"),
				new XAttribute("cy", "9144000")
			)
		);
		
		tempElement = new XElement(openXml.P.defaultTextStyle);
		tempElement.add(new XElement(openXml.A.defPPr,
			new XElement(openXml.A.defRPr, 
				new XAttribute("lang", "en-US")
			)
		));
		for (i = 1; i < 10; i++) {
			elementName = openXml.A["lvl" + i + "pPr"];
			tempElement.add(new XElement(elementName,
				new XAttribute("marL", j),
				new XAttribute("algn", "l"),
				new XAttribute("defTabSz", "914400"),
				new XAttribute("rtl", "0"),
				new XAttribute("eaLnBrk", "1"),
				new XAttribute("latinLnBrk", "0"),
				new XAttribute("hangingPuct", "1"),
				new XElement(openXml.A.defRPr,
					new XAttribute("sz", "1800"),
					new XAttribute("kern", "1200"),
					new XElement(openXml.A.solidFill,
						new XElement(openXml.A.schemeClr,
							new XAttribute("val", "tx1")
						)
					),
					new XElement(openXml.A.latin,
						new XAttribute("typeface", "+mn-lt")
					),
					new XElement(openXml.A.ea,
						new XAttribute("typeface", "+mn-ea")
					),
					new XElement(openXml.A.cs,
						new XAttribute("typeface", "+mn-cs")
					)
				)
			));
			j += 457200;
		}
		
		elementName = new XNamespace("http://schemas.microsoft.com/office/powerpoint/2012/main")
		presentationElement.add(tempElement,
			new XElement(openXml.P.extLst,
				new XElement(openXml.P.ext,
					new XAttribute("uri", "{EFAFB233-063F-42B5-8137-9DF3F51BA10A}"),
					new XElement(
						new XName(elementName, "sldGuideLst"),
						new XAttribute(XNamespace.xmlns + "p15", elementName.namespaceName)
					)
				)
			)
		);
		
		return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"),
			presentationElement
		);
	},
	generatePptxSlideMasterXML: function () {
		return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"),
			new XElement(openXml.P.sldMaster,
				new XAttribute(XNamespace.xmlns + "a", openXml.aNs.namespaceName),
				new XAttribute(XNamespace.xmlns + "r", openXml.rNs.namespaceName),
				new XAttribute(XNamespace.xmlns + "p", openXml.pNs.namespaceName),				
				new XElement(openXml.P.cSld,
					new XElement(openXml.P.bg,
						new XElement(openXml.P.bgRef,
							new XAttribute("idx", "1001"),
							new XElement(openXml.A.schemeClr,
								new XAttribute("val", "bg1")
							)
						)
					),
					new XElement(openXml.P.spTree,
						new XElement(openXml.P.nvGrpSpPr,
							new XElement(openXml.P.cNvPr,
								new XAttribute("id", "1"),
								new XAttribute("name", "")
							),
							new XElement(openXml.P.cNvGrpSpPr),
							new XElement(openXml.P.nvPr)
						),
						new XElement(openXml.P.grpSpPr,
							new XElement(openXml.A.xfrm,
								new XElement(openXml.A.off,
									new XAttribute("x", "0"),
									new XAttribute("y", "0")
								),
								new XElement(openXml.A.ext,
									new XAttribute("cx", "0"),
									new XAttribute("cy", "0")
								),
								new XElement(openXml.A.chOff,
									new XAttribute("x", "0"),
									new XAttribute("y", "0")
								),
								new XElement(openXml.A.chExt,
									new XAttribute("cx", "0"),
									new XAttribute("cy", "0")
								)
							)
						),
						new XElement(openXml.P.sp,
							new XElement(openXml.P.nvSpPr,
								new XElement(openXml.P.cNvPr,
									new XAttribute("id", "2"),
									new XAttribute("name", "Title Placeholder 1")
								),
								new XElement(openXml.P.cNvSpPr,
									new XElement(openXml.A.spLocks,
										new XAttribute("noGrp", "1")
									)
								),
								new XElement(openXml.P.nvPr,
									new XElement(openXml.P.ph,
										new XAttribute("type", "title")										
									)
								)
							),
							new XElement(openXml.P.spPr,
								new XElement(openXml.A.xfrm, 
									new XElement(openXml.A.off,
										new XAttribute("x", "457200"),
										new XAttribute("y", "274638")
									),
									new XElement(openXml.A.ext,
										new XAttribute("cx", "8229600"),
										new XAttribute("cy", "1143000")
									)
								),
								new XElement(openXml.A.prstGeom,
									new XAttribute("prst", "rect"),
									new XElement(openXml.A.avLst)
								)
							),
							new XElement(openXml.P.txBody,
								new XElement(openXml.A.bodyPr, 
									new XAttribute("vert", "horz"),
									new XAttribute("lIns", "91440"),
									new XAttribute("tIns", "45720"),
									new XAttribute("rIns", "91440"),
									new XAttribute("bIns", "45720"),
									new XAttribute("rtlCol", "0"),
									new XAttribute("anchor", "ctr"),
									new XElement(openXml.A.normAutofit)
								),
								new XElement(openXml.A.lstStyle),
								new XElement(openXml.A.p,
									new XElement(openXml.A.r,
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "Click to edit Master title style")
									),
									new XElement(openXml.A.endParaRPr,
										new XAttribute("lang", "en-US")
									)
								)
							)
						),
						new XElement(openXml.P.sp,
							new XElement(openXml.P.nvSpPr,
								new XElement(openXml.P.cNvPr,
									new XAttribute("id", "3"),
									new XAttribute("name", "Text Placeholder 2")
								),
								new XElement(openXml.P.cNvSpPr,
									new XElement(openXml.A.spLocks,
										new XAttribute("noGrp", "1")
									)
								),
								new XElement(openXml.P.nvPr,
									new XElement(openXml.P.ph,
										new XAttribute("type", "body"),
										new XAttribute("idx", "1")
									)
								)
							),
							new XElement(openXml.P.spPr,
								new XElement(openXml.A.xfrm, 
									new XElement(openXml.A.off,
										new XAttribute("x", "457200"),
										new XAttribute("y", "1600200")
									),
									new XElement(openXml.A.ext,
										new XAttribute("cx", "8229600"),
										new XAttribute("cy", "4525963")
									)
								),
								new XElement(openXml.A.prstGeom,
									new XAttribute("prst", "rect"),
									new XElement(openXml.A.avLst)
								)
							),
							new XElement(openXml.P.txBody,
								new XElement(openXml.A.bodyPr, 
									new XAttribute("vert", "horz"),
									new XAttribute("lIns", "91440"),
									new XAttribute("tIns", "45720"),
									new XAttribute("rIns", "91440"),
									new XAttribute("bIns", "45720"),
									new XAttribute("rtlCol", "0"),									
									new XElement(openXml.A.normAutofit)
								),
								new XElement(openXml.A.lstStyle),
								new XElement(openXml.A.p,
									new XElement(openXml.A.pPr,
										new XAttribute("lvl", "0")
									),
									new XElement(openXml.A.r,
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "Click to edit Master text styles")
									)
								),
								new XElement(openXml.A.p,
									new XElement(openXml.A.pPr,
										new XAttribute("lvl", "1")
									),
									new XElement(openXml.A.r,
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "Second level")
									)
								),
								new XElement(openXml.A.p,
									new XElement(openXml.A.pPr,
										new XAttribute("lvl", "2")
									),
									new XElement(openXml.A.r,
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "Third level")
									)
								),
								new XElement(openXml.A.p,
									new XElement(openXml.A.pPr,
										new XAttribute("lvl", "3")
									),
									new XElement(openXml.A.r,
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "Fourth level")
									)
								),
								new XElement(openXml.A.p,
									new XElement(openXml.A.pPr,
										new XAttribute("lvl", "4")
									),
									new XElement(openXml.A.r,
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "Fifth level")
									),
									new XElement(openXml.A.endParaRPr,
										new XAttribute("lang", "en-US")
									)
								)
							)
						),
						new XElement(openXml.P.sp,
							new XElement(openXml.P.nvSpPr,
								new XElement(openXml.P.cNvPr,
									new XAttribute("id", "4"),
									new XAttribute("name", "Date Placeholder 3")
								),
								new XElement(openXml.P.cNvSpPr,
									new XElement(openXml.A.spLocks,
										new XAttribute("noGrp", "1")
									)
								),
								new XElement(openXml.P.nvPr,
									new XElement(openXml.P.ph,
										new XAttribute("type", "dt"),
										new XAttribute("sz", "half"),
										new XAttribute("idx", "2")
									)
								)
							),
							new XElement(openXml.P.spPr,
								new XElement(openXml.A.xfrm, 
									new XElement(openXml.A.off,
										new XAttribute("x", "457200"),
										new XAttribute("y", "6356350")
									),
									new XElement(openXml.A.ext,
										new XAttribute("cx", "2133600"),
										new XAttribute("cy", "365125")
									)
								),
								new XElement(openXml.A.prstGeom,
									new XAttribute("prst", "rect"),
									new XElement(openXml.A.avLst)
								)
							),
							new XElement(openXml.P.txBody,
								new XElement(openXml.A.bodyPr, 
									new XAttribute("vert", "horz"),
									new XAttribute("lIns", "91440"),
									new XAttribute("tIns", "45720"),
									new XAttribute("rIns", "91440"),
									new XAttribute("bIns", "45720"),
									new XAttribute("rtlCol", "0"),
									new XAttribute("anchor", "ctr")
								),
								new XElement(openXml.A.lstStyle,
									new XElement(openXml.A.lvl1pPr,
										new XAttribute("algn", "l"),
										new XElement(openXml.A.defRPr,
											new XAttribute("sz", "1200"),
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									)
								),
								new XElement(openXml.A.p,
									new XElement(openXml.A.fld,
										new XAttribute("id", "{F8166F1F-CE9B-4651-A6AA-CD717754106B}"),
										new XAttribute("type", "datetimeFigureOut"),
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "6/13/2013")
									),
									new XElement(openXml.A.endParaRPr,
										new XAttribute("lang", "en-US")
									)
								)
							)
						),
						new XElement(openXml.P.sp,
							new XElement(openXml.P.nvSpPr,
								new XElement(openXml.P.cNvPr,
									new XAttribute("id", "5"),
									new XAttribute("name", "Footer Placeholder 4")
								),
								new XElement(openXml.P.cNvSpPr,
									new XElement(openXml.A.spLocks,
										new XAttribute("noGrp", "1")
									)
								),
								new XElement(openXml.P.nvPr,
									new XElement(openXml.P.ph,
										new XAttribute("type", "ftr"),
										new XAttribute("sz", "quarter"),
										new XAttribute("idx", "3")
									)
								)
							),
							new XElement(openXml.P.spPr,
								new XElement(openXml.A.xfrm, 
									new XElement(openXml.A.off,
										new XAttribute("x", "3124200"),
										new XAttribute("y", "6356350")
									),
									new XElement(openXml.A.ext,
										new XAttribute("cx", "2895600"),
										new XAttribute("cy", "365125")
									)
								),
								new XElement(openXml.A.prstGeom,
									new XAttribute("prst", "rect"),
									new XElement(openXml.A.avLst)
								)
							),
							new XElement(openXml.P.txBody,
								new XElement(openXml.A.bodyPr, 
									new XAttribute("vert", "horz"),
									new XAttribute("lIns", "91440"),
									new XAttribute("tIns", "45720"),
									new XAttribute("rIns", "91440"),
									new XAttribute("bIns", "45720"),
									new XAttribute("rtlCol", "0"),
									new XAttribute("anchor", "ctr")
								),
								new XElement(openXml.A.lstStyle,
									new XElement(openXml.A.lvl1pPr,
										new XAttribute("algn", "ctr"),
										new XElement(openXml.A.defRPr,
											new XAttribute("sz", "1200"),
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									)
								),
								new XElement(openXml.A.p,
									new XElement(openXml.A.endParaRPr,
										new XAttribute("lang", "en-US")
									)
								)
							)
						),
						new XElement(openXml.P.sp,
							new XElement(openXml.P.nvSpPr,
								new XElement(openXml.P.cNvPr,
									new XAttribute("id", "6"),
									new XAttribute("name", "Slide Number Placeholder 5")
								),
								new XElement(openXml.P.cNvSpPr,
									new XElement(openXml.A.spLocks,
										new XAttribute("noGrp", "1")
									)
								),
								new XElement(openXml.P.nvPr,
									new XElement(openXml.P.ph,
										new XAttribute("type", "sldNum"),
										new XAttribute("sz", "quarter"),
										new XAttribute("idx", "4")
									)
								)
							),
							new XElement(openXml.P.spPr,
								new XElement(openXml.A.xfrm, 
									new XElement(openXml.A.off,
										new XAttribute("x", "6553200"),
										new XAttribute("y", "6356350")
									),
									new XElement(openXml.A.ext,
										new XAttribute("cx", "2133600"),
										new XAttribute("cy", "365125")
									)
								),
								new XElement(openXml.A.prstGeom,
									new XAttribute("prst", "rect"),
									new XElement(openXml.A.avLst)
								)
							),
							new XElement(openXml.P.txBody,
								new XElement(openXml.A.bodyPr, 
									new XAttribute("vert", "horz"),
									new XAttribute("lIns", "91440"),
									new XAttribute("tIns", "45720"),
									new XAttribute("rIns", "91440"),
									new XAttribute("bIns", "45720"),
									new XAttribute("rtlCol", "0"),
									new XAttribute("anchor", "ctr")
								),
								new XElement(openXml.A.lstStyle,
									new XElement(openXml.A.lvl1pPr,
										new XAttribute("algn", "r"),
										new XElement(openXml.A.defRPr,
											new XAttribute("sz", "1200"),
											new XElement(openXml.A.solidFill,
												new XElement(openXml.A.schemeClr,
													new XAttribute("val", "tx1"),
													new XElement(openXml.A.tint,
														new XAttribute("val", "75000")
													)
												)
											)
										)
									)
								),
								new XElement(openXml.A.p,
									new XElement(openXml.A.fld,
										new XAttribute("id", "{F7021451-1387-4CA6-816F-3879F97B5CBC}"),
										new XAttribute("type", "slidenum"),
										new XElement(openXml.A.rPr,
											new XAttribute("lang", "en-US"),
											new XAttribute("smtClean", "0")
										),
										new XElement(openXml.A.t, "â¹#âº")
									),
									new XElement(openXml.A.endParaRPr,
										new XAttribute("lang", "en-US")
									)
								)
							)
						)
					)				
				),
				new XElement(openXml.P.clrMap,
					new XAttribute("bg1", "lt1"),
					new XAttribute("tx1", "dk1"),
					new XAttribute("bg2", "lt2"),
					new XAttribute("tx2", "dk2"),
					new XAttribute("accent1", "accent1"),
					new XAttribute("accent2", "accent2"),
					new XAttribute("accent3", "accent3"),
					new XAttribute("accent4", "accent4"),
					new XAttribute("accent5", "accent5"),
					new XAttribute("accent6", "accent6"),
					new XAttribute("hlink", "hlink"),
					new XAttribute("folHlink", "folHlink")
				),
				new XElement(openXml.P.sldLayoutIdLst, 
					new XElement(openXml.P.sldLayoutId,
						new XAttribute("id", "2147483649"),
						new XAttribute(openXml.R.id, "rId1")
					)
				),
				new XElement(openXml.P.txStyles,
					new XElement(openXml.P.titleStyle,
						new XElement(openXml.A.lvl1pPr,
							new XAttribute("algn", "ctr"),							
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),
							new XElement(openXml.A.spcBef,
								new XElement(openXml.A.spcPct,
									new XAttribute("val", "0")
								)
							),
							new XElement(openXml.A.buNone),
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "4400"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mj-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mj-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mj-cs")
								)
							)
						)
					),
					new XElement(openXml.P.bodyStyle,
						new XElement(openXml.A.lvl1pPr,
							new XAttribute("marL", "342900"),
							new XAttribute("indent", "-342900"),
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),
							new XElement(openXml.A.spcBef,
								new XElement(openXml.A.spcPct,
									new XAttribute("val", "20000")
								)
							),
							new XElement(openXml.A.buFont,
								new XAttribute("typeface", "Arial"),
								new XAttribute("pitchFamily", "34"),
								new XAttribute("charset", "0")
							),
							new XElement(openXml.A.buChar,
								new XAttribute("char", "â¢")
							),
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "3200"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),
						new XElement(openXml.A.lvl2pPr,
							new XAttribute("marL", "742950"),
							new XAttribute("indent", "-285750"),
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),
							new XElement(openXml.A.spcBef,
								new XElement(openXml.A.spcPct,
									new XAttribute("val", "20000")
								)
							),
							new XElement(openXml.A.buFont,
								new XAttribute("typeface", "Arial"),
								new XAttribute("pitchFamily", "34"),
								new XAttribute("charset", "0")
							),
							new XElement(openXml.A.buChar,
								new XAttribute("char", "â")
							),
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "2800"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),
						new XElement(openXml.A.lvl3pPr,
							new XAttribute("marL", "1143000"),
							new XAttribute("indent", "-228600"),
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),
							new XElement(openXml.A.spcBef,
								new XElement(openXml.A.spcPct,
									new XAttribute("val", "20000")
								)
							),
							new XElement(openXml.A.buFont,
								new XAttribute("typeface", "Arial"),
								new XAttribute("pitchFamily", "34"),
								new XAttribute("charset", "0")
							),
							new XElement(openXml.A.buChar,
								new XAttribute("char", "â¢")
							),
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "2400"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),
						new XElement(openXml.A.lvl4pPr,
							new XAttribute("marL", "1600200"),
							new XAttribute("indent", "-228600"),
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),
							new XElement(openXml.A.spcBef,
								new XElement(openXml.A.spcPct,
									new XAttribute("val", "20000")
								)
							),
							new XElement(openXml.A.buFont,
								new XAttribute("typeface", "Arial"),
								new XAttribute("pitchFamily", "34"),
								new XAttribute("charset", "0")
							),
							new XElement(openXml.A.buChar,
								new XAttribute("char", "â")
							),
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "2000"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),
						new XElement(openXml.A.lvl5pPr,
							new XAttribute("marL", "2057400"),
							new XAttribute("indent", "-228600"),
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),
							new XElement(openXml.A.spcBef,
								new XElement(openXml.A.spcPct,
									new XAttribute("val", "20000")
								)
							),
							new XElement(openXml.A.buFont,
								new XAttribute("typeface", "Arial"),
								new XAttribute("pitchFamily", "34"),
								new XAttribute("charset", "0")
							),
							new XElement(openXml.A.buChar,
								new XAttribute("char", "Â»")
							),
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "2000"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),
						new XElement(openXml.A.lvl6pPr,
							new XAttribute("marL", "2514600"),
							new XAttribute("indent", "-228600"),
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),
							new XElement(openXml.A.spcBef,
								new XElement(openXml.A.spcPct,
									new XAttribute("val", "20000")
								)
							),
							new XElement(openXml.A.buFont,
								new XAttribute("typeface", "Arial"),
								new XAttribute("pitchFamily", "34"),
								new XAttribute("charset", "0")
							),
							new XElement(openXml.A.buChar,
								new XAttribute("char", "â¢")
							),
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "2000"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),
						new XElement(openXml.A.lvl7pPr,
							new XAttribute("marL", "2971800"),
							new XAttribute("indent", "-228600"),
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),
							new XElement(openXml.A.spcBef,
								new XElement(openXml.A.spcPct,
									new XAttribute("val", "20000")
								)
							),
							new XElement(openXml.A.buFont,
								new XAttribute("typeface", "Arial"),
								new XAttribute("pitchFamily", "34"),
								new XAttribute("charset", "0")
							),
							new XElement(openXml.A.buChar,
								new XAttribute("char", "â¢")
							),
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "2000"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),
						new XElement(openXml.A.lvl8pPr,
							new XAttribute("marL", "3429000"),
							new XAttribute("indent", "-228600"),
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),
							new XElement(openXml.A.spcBef,
								new XElement(openXml.A.spcPct,
									new XAttribute("val", "20000")
								)
							),
							new XElement(openXml.A.buFont,
								new XAttribute("typeface", "Arial"),
								new XAttribute("pitchFamily", "34"),
								new XAttribute("charset", "0")
							),
							new XElement(openXml.A.buChar,
								new XAttribute("char", "â¢")
							),
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "2000"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),
						new XElement(openXml.A.lvl9pPr,
							new XAttribute("marL", "3886200"),
							new XAttribute("indent", "-228600"),
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),
							new XElement(openXml.A.spcBef,
								new XElement(openXml.A.spcPct,
									new XAttribute("val", "20000")
								)
							),
							new XElement(openXml.A.buFont,
								new XAttribute("typeface", "Arial"),
								new XAttribute("pitchFamily", "34"),
								new XAttribute("charset", "0")
							),
							new XElement(openXml.A.buChar,
								new XAttribute("char", "â¢")
							),
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "2000"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						)				
					),
					new XElement(openXml.P.otherStyle,
						new XElement(openXml.A.defPPr,
							new XElement(openXml.A.defRPr,
								new XAttribute("lang", "en-US")
							)
						),						
						new XElement(openXml.A.lvl1pPr,
							new XAttribute("marL", "0"),							
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),							
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "1800"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),
						new XElement(openXml.A.lvl2pPr,
							new XAttribute("marL", "457200"),							
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),							
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "1800"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),
						new XElement(openXml.A.lvl3pPr,
							new XAttribute("marL", "914400"),							
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),							
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "1800"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),						
						new XElement(openXml.A.lvl4pPr,
							new XAttribute("marL", "1371600"),							
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),							
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "1800"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),						
						new XElement(openXml.A.lvl5pPr,
							new XAttribute("marL", "1828800"),							
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),							
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "1800"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),						
						new XElement(openXml.A.lvl6pPr,
							new XAttribute("marL", "2286000"),							
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),							
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "1800"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),						
						new XElement(openXml.A.lvl7pPr,
							new XAttribute("marL", "2743200"),							
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),							
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "1800"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),						
						new XElement(openXml.A.lvl8pPr,
							new XAttribute("marL", "3200400"),							
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),							
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "1800"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						),						
						new XElement(openXml.A.lvl9pPr,
							new XAttribute("marL", "3657600"),							
							new XAttribute("algn", "l"),
							new XAttribute("defTabSz", "914400"),
							new XAttribute("rtl", "0"),
							new XAttribute("eaLnBrk", "1"),
							new XAttribute("latinLnBrk", "0"),
							new XAttribute("hangingPuct", "1"),							
							new XElement(openXml.A.defRPr,
								new XAttribute("sz", "1800"),
								new XAttribute("kern", "1200"),
								new XElement(openXml.A.solidFill,
									new XElement(openXml.A.schemeClr,
										new XAttribute("val", "tx1")
									)
								),
								new XElement(openXml.A.latin,
									new XAttribute("typeface", "+mn-lt")
								),
								new XElement(openXml.A.ea,
									new XAttribute("typeface", "+mn-ea")
								),
								new XElement(openXml.A.cs,
									new XAttribute("typeface", "+mn-cs")
								)
							)
						)
					)
				)
			)
		);
	},
	generatePptxDocPropsAppXML: function() {
    	var me = this,
			slides = me.pages,
			sl = slides.length,
			creator = me.creator,
			i = 0,			
			propertiesElement, tempElement;
		
		propertiesElement = new XElement(openXml.EP.Properties,
			new XAttribute("xmlns", openXml.epNs.namespaceName),
			new XAttribute(XNamespace.xmlns + "vt", openXml.vtNs.namespaceName),									
			new XElement(openXml.EP.TotalTime, "0"),
			new XElement(openXml.EP.Words, "0"),
			new XElement(openXml.EP.Application, "Microsoft Office PowerPoint"),
			new XElement(openXml.EP.PresentationFormat, "On-screen Show (4:3)"),
			new XElement(openXml.EP.Paragraphs, "0"),
			new XElement(openXml.EP.Slides, sl),
			new XElement(openXml.EP.Notes, "0"),
			new XElement(openXml.EP.HiddenSlides, "0"),
			new XElement(openXml.EP.MMClips, "0"),
			new XElement(openXml.EP.ScaleCrop, "false"),
			new XElement(openXml.EP.HeadingPairs,
				new XElement(openXml.VT.vector, 
					new XAttribute("size", "4"),
					new XAttribute("baseType", "variant"),
					new XElement(openXml.VT.variant,
						new XElement(openXml.VT.lpstr, "Theme")
					),
					new XElement(openXml.VT.variant,
						new XElement(openXml.VT.i4, "1")
					),
					new XElement(openXml.VT.variant,
						new XElement(openXml.VT.lpstr, "Slide Titles")
					),
					new XElement(openXml.VT.variant,
						new XElement(openXml.VT.i4, sl)
					)
				)
			)
		);
		tempElement = new XElement(openXml.VT.vector, 
			new XAttribute("size", (sl + 1)),
			new XAttribute("baseType", "lpstr"),
			new XElement(openXml.VT.lpstr, "Office Theme")
		)
		
		for (i; i < sl; i++) {
			tempElement.add(new XElement(openXml.VT.lpstr, Ext.String.htmlEncode(slides[i].slide.name)));
		}
		
		propertiesElement.add(
			new XElement(openXml.EP.TitlesOfParts, tempElement),
			new XElement(openXml.EP.Company, creator),
			new XElement(openXml.EP.LinksUpToDate, "false"),
			new XElement(openXml.EP.SharedDoc, "false"),
			new XElement(openXml.EP.HyperlinksChanged, "false"),
			new XElement(openXml.EP.AppVersion, "12.0000")
		);
		return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"),
			propertiesElement
		)
		
    },
	generatePptxSlideXML: function(config) {
		var me = this,
			i = 0,
			slideData = config.data,
			sdl = slideData.length,
			showSlide = (config.slide.show ? "1" : "0"),
			backgroundCfg = (config.slide.background ? config.slide.background : 'ffffff'),
			backgroundElement, slideElement, spTreeElement, element;
					
		backgroundElement = me.generatePptxColorSelectionElement(false, backgroundCfg);
		
		spTreeElement = new XElement(openXml.P.spTree,
			new XElement(openXml.P.nvGrpSpPr,
				new XElement(openXml.P.cNvPr,
					new XAttribute("id", "1"),
					new XAttribute("name", "")
				),
				new XElement(openXml.P.cNvGrpSpPr),
				new XElement(openXml.P.nvPr)
			),
			new XElement(openXml.P.grpSpPr,
				new XElement(openXml.A.xfrm,
					new XElement(openXml.A.off,
						new XAttribute("x", "0"),
						new XAttribute("y", "0")
					),
					new XElement(openXml.A.ext,
						new XAttribute("cx", "0"),
						new XAttribute("cy", "0")
					),
					new XElement(openXml.A.chOff,
						new XAttribute("x", "0"),
						new XAttribute("y", "0")
					),
					new XElement(openXml.A.chExt,
						new XAttribute("cx", "0"),
						new XAttribute("cy", "0")
					)
				)
			)
		);
		
		for (i; i < sdl; i++) {
			element = me.generateSlideDataComponentXML(slideData[i], i);
			spTreeElement.add(element);
		}
		
		slideElement = new XElement(openXml.P.sld,
			new XAttribute(XNamespace.xmlns + "a", openXml.aNs.namespaceName),
			new XAttribute(XNamespace.xmlns + "r", openXml.rNs.namespaceName),
			new XAttribute(XNamespace.xmlns + "p", openXml.pNs.namespaceName),
			new XAttribute("show", showSlide),
			new XElement(openXml.P.cSld,
				backgroundElement,
				spTreeElement
			),
			new XElement(openXml.P.clrMapOvr,
				new XElement(openXml.A.masterClrMapping)
			)
		);
       
        return new XDocument(
			new XDeclaration("1.0", "utf-8", "yes"),
			slideElement
		)
    }
	
	/*
    cbMakeCharts: function(chartInfo) {
        var chart = new OfficeChart(chartInfo);
        //console.log("genpptx.cbMakeCharts() is called")
        return chart.toXML();
    },
    cbMakeChartDataExcel: function(data) {
        // Empty by default
    }
	*/
});