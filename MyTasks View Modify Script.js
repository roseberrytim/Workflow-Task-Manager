


Sharepoint.data.WebServices.updateView(
'{9FF34B79-151F-4F76-AA3D-CE5C4D9DFE63}', 
'{11E4ADBA-440F-4992-9AB2-9D6F7BA84272}',
'<View DisplayName="My Tasks" />',
'<Query><Where><And><Or><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo"/></Membership><Eq><FieldRef Name="AssignedTo"/><Value Type="Integer"><UserID Type="Integer"/></Value></Eq></Or><Eq><FieldRef Name="Status"/><Value Type="Text">Started</Value></Eq></And></Where></Query>',
'<ViewFields><FieldRef Name="ID"></FieldRef><FieldRef Name="LinkTitle"></FieldRef><FieldRef Name="Status"></FieldRef><FieldRef Name="AssignedTo"></FieldRef><FieldRef Name="CurrentNode"></FieldRef><FieldRef Name="CurrentNodeName"></FieldRef><FieldRef Name="StartDate"></FieldRef><FieldRef Name="CompleteDate"></FieldRef><FieldRef Name="DueDate"></FieldRef><FieldRef Name="WorkflowInstance"></FieldRef><FieldRef Name="ParentTask"></FieldRef></ViewFields>',
'<Aggregations Value="Off"></Aggregations>',
'<Formats></Formats>',
'<RowLimit Paged="TRUE">100</RowLimit>',
this, function () {});