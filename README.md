# yle-program-list
Integration between external YLE api and Drupal fields.
--------------------------

This module provides a widget which provides suggestions of Yle Programs titles
from external Yle Api. 
The module can be therefore used to facilitate editing of nodes.
The provider of data is YLE, i.e. Finnish Broadcast Company.


Installation
------------
Module can be installed like any other Drupal module.
Just place it into the modules directory for your site and enable it.


How it works?
--------------------------
When installed, the module will serve a new Widget 
"YLE Program List Autocomplete Text" field which can be used together with Text Fields.
If a text field with that Widget Type is added to Content Type, then users will get
an autocomplete text field with the suggestions of Yle Programs titles.
To get autocomplete working, a User should type at least 2 characters.
At once, a User can select only one option from autocomplete option list.
However, it is also possible to write several YLE Programs in the field. For that, 
a User should type a comma symbol and start typing new word. Each next YLE Program title
will be appended to the end of the text field.
 

Configuration
--------------------------
Common configuration settings can be found here admin/config/yle_program_list/settings.
One must fill out YLE Application ID and Application Key so that request can be performed.
The limit of results can also be set there.

Also, it is possible to configure the language of autocomplete suggestions.
To do that, one should look at Field Settings. 
There are three options, i.e EN, FI and SV, where Swedish language is default.

