/**
 █▒▓▒░ The FlowPaper Project

 This file is part of FlowPaper.

 FlowPaper is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, version 3 of the License.

 FlowPaper is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with FlowPaper.  If not, see <http://www.gnu.org/licenses/>.

 For more information on FlowPaper please see the FlowPaper project
 home page: https://flowpaper.com
 */

jQuery(function() {
    /**
     * Handles the event of external links getting clicked in the document.
     *
     * @example onExternalLinkClicked("http://www.google.com")
     *
     * @param String link
     */
    jQuery('#documentViewer').bind('onExternalLinkClicked',function(e,link){
        if(link.indexOf('mailto:')==0){
            window.parent.location.href = link;
        }else if(!FLOWPAPER.LinkTarget || (FLOWPAPER.LinkTarget && FLOWPAPER.LinkTarget == 'New window')){
            if (window.eb && window.eb.platform && window.eb.platform.touchonlydevice) {
                if (window != window.top) { // in a iframe
                    window.parent.location.href = link;
                } else { // loaded as parent
                    document.location.href = link;
                }
            } else {
                var newWindow = window.open(link, '_flowpaper_exturl'+new Date().getTime());

                if (FLOWPAPER.blockedNewWindow(newWindow)) {
                    document.location.href = link;
                }
            }
        }else if(FLOWPAPER.LinkTarget){
            if(FLOWPAPER.LinkTarget == 'Full window'){
                window.parent.location.href = link;
            }

            if(FLOWPAPER.LinkTarget == 'Same window'){
                window.location.href = link;
            }
        }
    });

    /**
     * Recieves progress information about the document being loaded
     *
     * @example onProgress( 100,10000 );
     *
     * @param int loaded
     * @param int total
     */
    jQuery('#documentViewer').bind('onProgress',function(e,loadedBytes,totalBytes){
        jQuery("#txt_progress").val('onProgress:' + loadedBytes + '/' + totalBytes + '\n');
    });

    /**
     * Handles the event of a document is in progress of loading
     *
     */
    jQuery('#documentViewer').bind('onDocumentLoading',function(e){
        jQuery("#txt_eventlog").val('onDocumentLoading' + '\n' + jQuery("#txt_eventlog").val());
    });

    /**
     * Handles the event of a document is in progress of loading
     *
     */
    jQuery('#documentViewer').bind('onPageLoading',function(e,pageNumber){
        jQuery("#txt_eventlog").val('onPageLoading:' + pageNumber + '\n' + jQuery("#txt_eventlog").val());
    });

    /**
     * Receives messages about the current page being changed
     *
     * @example onCurrentPageChanged( 10 );
     *
     * @param int pagenum
     */
    jQuery('#documentViewer').bind('onCurrentPageChanged',function(e,pagenum){
        jQuery("#txt_eventlog").val('onCurrentPageChanged:' + pagenum + '\n' + jQuery("#txt_eventlog").val());
    });

    /**
     * Receives messages about the document being loaded
     *
     * @example onDocumentLoaded( 20 );
     *
     * @param int totalPages
     */
    jQuery('#documentViewer').bind('onDocumentLoaded',function(e,totalPages){
        jQuery("#txt_eventlog").val('onDocumentLoaded:' + totalPages + '\n' + jQuery("#txt_eventlog").val());
    });

    /**
     * Receives messages about the page loaded
     *
     * @example onPageLoaded( 1 );
     *
     * @param int pageNumber
     */
    jQuery('#documentViewer').bind('onPageLoaded',function(e,pageNumber){
        jQuery("#txt_eventlog").val('onPageLoaded:' + pageNumber + '\n' + jQuery("#txt_eventlog").val());
    });

    /**
     * Receives messages about the page loaded
     *
     * @example onErrorLoadingPage( 1 );
     *
     * @param int pageNumber
     */
    jQuery('#documentViewer').bind('onErrorLoadingPage',function(e,pageNumber){
        jQuery("#txt_eventlog").val('onErrorLoadingPage:' + pageNumber + '\n' + jQuery("#txt_eventlog").val());
    });

    /**
     * Receives error messages when a document is not loading properly
     *
     * @example onDocumentLoadedError( "Network error" );
     *
     * @param String errorMessage
     */
    jQuery('#documentViewer').bind('onDocumentLoadedError',function(e,errMessage){
        jQuery("#txt_eventlog").val('onDocumentLoadedError:' + errMessage + '\n' + jQuery("#txt_eventlog").val());
    });

    /**
     * Receives error messages when a document has finished printed
     *
     * @example onDocumentPrinted();
     *
     */
    jQuery('#documentViewer').bind('onDocumentPrinted',function(e,numPages){
        jQuery("#txt_eventlog").val('onDocumentPrinted\n' + jQuery("#txt_eventlog").val());
    });

    /**
     * Handles the event of a pdf requiring a password
     *
     * @example onPasswordNeeded(updatePassword,reason)
     *
     * @param updatePassword callback function for setting the password
     */
    jQuery('#documentViewer').bind('onPasswordNeeded',function(e,updatePassword){
        updatePassword("test");
    });
});