
/**
 * jQuery Form Replicator
 * ----------------------
 * @author Milan Kyncl <kontakt@milankyncl.cz>
 * @package jquery-form-replicator
 * @licence MIT
 */

$.fn.formReplicator = function( groupName, options ) {

    if(groupName === undefined)
        return false;

    /**
     * Default settings
     */

    var settings = $.extend({

        firstItemUndeletable: false,
        onHide: function(item) {

            item.fadeOut(function () {

                $(this).remove();
            });
        },
        onShow: function(item) {

            item.fadeIn();
        }

    }, options);

    /**
     * Now the plugin core
     */

    var group = this;
    var groupItems = group.find('[data-group-item]');
    var addGroupItem = group.find('[data-group-add-item]');
    var index = 0;

    /**
     * Create template
     */

    var template = $(groupItems.get(0)).clone();

    /**
     * Parse inputs, selects, textareas in group
     */

    groupItems.each(function(_i) {

        var item = $(this);

        if(settings.firstItemUndeletable && _i === 0)
            item.find('[data-group-remove-item]').hide();

        item.find('select, input, textarea').each(function() {

            item.attr('name', groupName + '[' + _i + '][' + item.attr('name') + ']');
        });

        item.find('[data-group-remove-item]').on('click', function(e) {

            e.preventDefault();

            settings.onHide(item);
        });

        index++;
    });

    /**
     * Cloning items
     */

    if(addGroupItem.length > 0) {

        addGroupItem.on('click', function(e) {

            e.preventDefault();

            var inner = group.find('[data-group-inner]');

            if(inner.length > 0) {

                var newItem = template.clone();

                newItem.addClass('clone');
                newItem.find('select, input, textarea').each(function() {

                    $(this).attr('name', groupName + '[' + index + '][' + $(this).attr('name') + ']');
                    $(this).val('');

                });
                newItem.find('[data-group-remove-item]').on('click', function(e) {

                    e.preventDefault();

                    settings.onHide(newItem);
                });

                newItem.hide();

                inner.append(newItem);

                settings.onShow(newItem);

                index++;
            }

        });
    }

};

