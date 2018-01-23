# jQuery Form replicator #

jQuery Form replicator plugin for easy form control with possibility to duplicate form groups.

## Configuration options ##

**firstItemUndeletable**

Set if first item is deletable or not.

```
default: false
options: boolean (true | false)
```

**onHide**

Callback executed after clicking ```[data-group-remove-item]``` element.

```
default: function(){ $(this).hide(function() { $(this).remove(); }); }
options: function(item){ // your code here }
arguments:
  item: jQuery element of item to be hidden
```

**onShow**

Callback executed after clicking ```[data-group-add-item]``` element.

```
default: function(){ $(this).show(); }
options: function(item){ // your code here }
arguments:
  item: jQuery element of item to be hidden
```