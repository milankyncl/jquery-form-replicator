
/**
 * jQuery Form Replicator
 * ----------------------
 * @author Milan Kyncl <kontakt@milankyncl.cz>
 * @package jquery-form-replicator
 * @licence MIT
 */

$('*[data-form-group]').each(function() {

    var group = $(this),
        groupName = group.data('form-group');
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

        $(this).find('select, input, textarea').each(function() {

            $(this).attr('name', groupName + '[' + _i + '][' + $(this).attr('name') + ']');

        });

        index++;
    });

    /**
     * Cloning items
     */

    if(addGroupItem.length > 0) {

        addGroupItem.on('click', function() {

            var inner = group.find('[data-group-inner]');

            if(inner.length > 0) {

                var newItem = template.clone();

                newItem.addClass('clone');
                newItem.find('select, input, textarea').each(function() {

                    $(this).attr('name', groupName + '[' + index + '][' + $(this).attr('name') + ']');

                });
                newItem.find('[data-group-remove-item]').click(function() {

                    newItem.remove();
                });

                inner.append(newItem);

                index++;

            }

        });
    }

    /**
     *
     */

});