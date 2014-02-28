

/**
 * Used on /news-events page to add functionality to the filters custom checkboxes 
 */


var EVT_SELECT_CHANGE = 'selectChange';

function Checkbox( $element )
{
    var selected = $element.hasClass('selected');
    
    $element.on('click', function()
    {
        selected = !selected;
        selected ? $(this).addClass('selected') : $(this).removeClass('selected');
        
        //trigger change
        $(this).trigger(EVT_SELECT_CHANGE);
    });
}

function CheckboxGroup( $elements )
{
    $elements.on(EVT_SELECT_CHANGE, function()
    {
        var filters = [];
        $($elements).filter('.selected').each(function() {
            filters.push( $(this).data("value") );
        });

        //get url and remove any query vars
        var url = window.location.href.replace(/\?.*$/, '');
        
        if( filters.length )
            window.location = url + "?filters=" + filters.join(',');
        else
            window.location = url;
    });
}