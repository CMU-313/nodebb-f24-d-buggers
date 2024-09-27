'use strict';

define('nodebb-frontend-f24-d-buggers/public/src/client/topic/endorse', ['module', 'socket.io', 'ajax'], function(module, socket, ajax) {
    var endorseTopic = {};

    endorseTopic.init = function(params) {
        // Delegate click event to dynamically handle endorse/unendorse actions
        $(document).on('click', 'a[component="topic/endorse"], a[component="post/endorse"]', function(e) {
            e.preventDefault();
            var $this = $(this);
            var tid = params.tid || $('#topic-id').data('tid');
            var pid = $this.closest('[component="post"]').data('pid') || null;
            var endpoint = pid ? `/api/write/posts/${pid}/endorse` : `/api/write/topics/${tid}/endorse`;

            var isEndorsed = $this.hasClass('endorsed');

            if (isEndorsed) {
                // Unendorse action
                ajax.delete(endpoint)
                    .done(function(response) {
                        if (response.status === 'ok') {
                            $this.removeClass('endorsed');
                            updateEndorseButton($this, false);
                            showAlert('Topic has been unendorsed.', 'success');
                        }
                    })
                    .fail(function(err){
                        console.error('Failed to unendorse:', err);
                        showAlert('Failed to unendorse.', 'error');
                    });
            } else {
                // Endorse action
                ajax.put(endpoint)
                    .done(function(response) {
                        if (response.status === 'ok') {
                            $this.addClass('endorsed');
                            updateEndorseButton($this, true);
                            showAlert('Topic has been endorsed.', 'success');
                        }
                    })
                    .fail(function(err){
                        console.error('Failed to endorse:', err);
                        showAlert('Failed to endorse.', 'error');
                    });
            }
        });
    };

    function updateEndorseButton($button, endorsed) {
        var icon = $button.find('i.fa');
        if (endorsed) {
            icon.removeClass('fa-star-o').addClass('fa-star');
            $button.contents().filter(function() {
                return this.nodeType === 3;
            }).first().replaceWith(' Unendorse Topic');
        } else {
            icon.removeClass('fa-star').addClass('fa-star-o');
            $button.contents().filter(function() {
                return this.nodeType === 3;
            }).first().replaceWith(' Endorse Topic');
        }
    }

    /**
     * Displays an alert message to the user.
     * @param {string} message - The message to display.
     * @param {string} type - The type of alert ('success' or 'error').
     */
    function showAlert(message, type) {
        // Utilize NodeBB's alert system if available
        if (app && app.alert) {
            app.alert({
                type: type,
                title: (type === 'success') ? 'Success' : 'Error',
                message: message,
                timeout: 3000
            });
        } else {
            // Fallback to browser alerts
            alert(message);
        }
    }

    module.exports = endorseTopic;
});