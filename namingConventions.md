## Naming conventions

# The basic idea and purpose

The idea is to name controllers and services in the format: action + resource
Controller and service layers are associated with distinct action verbs
to prevent conflicts and confusion between names of functions in distinct layers.

# Exceptions

If there is a more descriptive verb for a type of action,
such as login or logout, which is not listed below
then use that verb instead.

# Controllers

Creating a resource: createX
Reading a resource: readY
Updating a resource: editZ
Deleting a resource: removeW

# Database services

Creating a resource: insertX
Reading a resource: selectY
Update a resource: updateZ
Deleting a resource: deleteW
