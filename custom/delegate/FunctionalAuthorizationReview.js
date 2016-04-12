Ext.define('Custom.delegate.FunctionalAuthorizationReview', {
	// Custom delegate listener to extract the Functional Area and to assign 
	/**
	 * Delegate function called from Workflow Engine during Task creation if a Listener is configured
	 * Object - taskConfigs  The created task config objects before it has been persisted
	 * Task.model.WorkflowNode   The current workflow step node config object
	 * Task.model.WorkflowInstance  The current workflow instance object
	 */
	notify: function (taskConfigs, node, instance) {
		try {
			var templateCfg = taskConfigs[0],
				functionals = ['PM', 'FM', 'EN', 'PK', 'LG', 'TE', 'COS', 'Intel', 'NFA'],
				i = 0,
				configs = [],
				directorate, fnRole;
			
			if (templateCfg) {
				directorate = this.getTransitionParameterLookupValue('Directorate');
				if (directorate) {
					for (i; i < 9; i++) {
						fnRole = this.getRoleLookupValue(directorate + ' OSF-' + functionals[i])
						if (!Ext.isEmpty(fnRole)) {
							configs.push(Ext.apply({}, {
								AssignedTo: fnRole
							}, templateCfg));
						}
					}
					return configs;
				}
			}
		} catch (e) {
			Ext.Error.raise("Could not find functional area assignee from directorate");
		}
		
		return taskConfigs;
	}
	
	
});