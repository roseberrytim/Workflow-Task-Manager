# Workflow-Task-Manager
ExtJs 4.x based client-side workflow engine and task management application

The files contained in this project are arranged into three different areas

1.) The workflow engine - "./workflow/Workflow.js"
2.) The customized workflow process supporting files and the process definition -
    a.) "./custom/*" - process supporting files
    b.) "./resources/json/Workflows.jso" - custom workflow process definitions registered 
        in the workflow engine. It is listed as a .jso but is a JSON formated file.
        SharePoint 2010 detects any file listed with a .json as part of its RESTful interface
        and tries to serve the file but the file is missing information to make it compatible.
3.) The actual Task Manager applicaiton - "./app/*"
    - The workflow diagram feature is not implemented in this version.
    
    
All of the components are client-side based and therefore the workflow engine and state management
of the active running processes are maintained in conjunction to memory based context loading and execution
as well as storing information inside customized SharePoint Lists and Libraries.  The application has been
implemented in SharePoint 2007 and SharePoint 2010 environments. The overall data schema that needs to be setup on the
SharePoint end is not provided in this project.  This is provided only for review purposes