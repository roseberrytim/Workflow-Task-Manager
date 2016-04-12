Ext.define('Custom.delegate.DirectorateReview', {
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
				configs = [],				
				directorates, i, sl, primaryStr, primary, directorate, supportStr, support, role, newScope, scope;
			
			if (templateCfg) {
				scope = Ext.decode(templateCfg["Scope"]) || {};
								
				primaryStr = this.getCurrentDetailItemLookupValue('PrimaryDirectorate');
				primary = this.parseSPLookupValues(primaryStr);				
				
				supportStr = this.getCurrentDetailItemLookupValue('SupportDirectorate');
				support = (Ext.isEmpty(supportStr)) ? [] : this.parseSPLookupValues(supportStr, true)
				
				directorates = Ext.Array.merge(primary, support);
				
				sl = directorates.length;
				for (i = 0; i < sl; i++) {
					role = this.getRoleLookupValue(directorates[i] + " Directorate Reviewer")
					
					newScope = Ext.apply({}, {
						"Directorate": directorates[i]
					}, scope);
					
					configs.push(Ext.apply({}, {
						AssignedTo: role,
						Scope: Ext.encode(newScope)
					}, templateCfg));
				}
				
				return configs;
			} else {
				return taskConfigs;
			}
		} catch (e) {
			Ext.Error.raise("Could not find Directorate Role assignee");
		}
		
		return taskConfigs;
	}
	
	
});