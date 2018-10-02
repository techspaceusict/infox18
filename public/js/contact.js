// var NameInput = React.createClass({displayName: "NameInput",
//     handleTextChange: function(){
//         var x = this.refs.nameField.getDOMNode().value;
        
//         if(x != ''){
//             this.refs.nameField.getDOMNode().className = 'active';
//         } else {
//             this.refs.nameField.getDOMNode().className = '';
//         }

//         this.props.onUserInput(x);
//     },
//     render: function(){
//         return (
//             React.createElement("div", {className: "control"}, 
//                 React.createElement("input", {type: "text", id: "name", ref: "nameField", placeholder: "Please Enter your Name", autoFocus: true, required: true, onChange: this.handleTextChange}), 
//                 React.createElement("label", {for: "name"}, "Name")
//             )
//         )
//     }
// });

// var EmailInput = React.createClass({displayName: "EmailInput",
//     handleTextChange: function(){
//         var x = this.refs.emailField.getDOMNode().value;
        
//         if(x != ''){
//             this.refs.emailField.getDOMNode().className = 'active';
//         } else {
//             this.refs.emailField.getDOMNode().className = '';
//         }

//         this.props.onUserInput('', x);
//     },
//     render: function(){
//         return (
//             React.createElement("div", {className: "control"}, 
//                 React.createElement("input", {type: "email", id: "email", ref: "emailField", placeholder: "Please Enter your email", required: true, onChange: this.handleTextChange}), 
//                 React.createElement("label", {for: "email"}, "e-mail")
//             )
//         )
//     }
// });

// var MessageArea = React.createClass({displayName: "MessageArea",
//     handleTextChange: function(){
//         var x = this.refs.messageBox.getDOMNode().value;
        
//         if(x != ''){
//             this.refs.messageBox.getDOMNode().className = 'active';
//         } else {
//             this.refs.messageBox.getDOMNode().className = '';
//         }

//         this.props.onUserInput('', '', x);
//     },
//     render: function(){
//         return (
//             React.createElement("div", {className: "control"}, 
//                 React.createElement("textarea", {id: "message", ref: "messageBox", placeholder: "What's on your mind?", required: true, onChange: this.handleTextChange}), 
//                 React.createElement("label", {for: "message"}, "Message")
//             )
//         )
//     }
// });

// var ContactForm = React.createClass({displayName: "ContactForm",
//     getInitialState: function() {
//         return {
//             nameText: '',
//             emailText: '',
//             messageText: ''
//         };
//     },
//     handleUserInput: function(nameText, emailText, messageText) {
//         this.setState({
//             nameText: nameText,
//             emailText: emailText,
//             messageText: messageText
//         });
//     },
//   render: function(){
//     return (
//          React.createElement("form", {action: "/"}, 
        
//             React.createElement("fieldset", null, 
//                 React.createElement("legend", null, "Contact Us"), 
                
//                 React.createElement(NameInput, {onUserInput: this.handleUserInput}), 
//                 React.createElement(EmailInput, {onUserInput: this.handleUserInput}), 
//                 React.createElement(MessageArea, {onUserInput: this.handleUserInput}), 
                
//                 React.createElement("input", {type: "submit", value: "send"})
//             )

//         )
//         );
//   }
// });

// React.render(React.createElement(ContactForm, null), document.getElementById('stage'));

// alert('kakak');

// Auto resize input
function resizeInput() {
    $(this).attr('size', $(this).val().length);
}

$('input[type="text"], input[type="email"]')
    // event handler
    .keyup(resizeInput)
    // resize on page load
    .each(resizeInput);


console.clear();
// Adapted from georgepapadakis.me/demo/expanding-textarea.html
(function(){
  
  var textareas = document.querySelectorAll('.expanding'),
      
      resize = function(t) {
        t.style.height = 'auto';
        t.style.overflow = 'hidden'; // Ensure scrollbar doesn't interfere with the true height of the text.
        t.style.height = (t.scrollHeight + t.offset ) + 'px';
        t.style.overflow = '';
      },
      
      attachResize = function(t) {
        if ( t ) {
          console.log('t.className',t.className);
          t.offset = !window.opera ? (t.offsetHeight - t.clientHeight) : (t.offsetHeight + parseInt(window.getComputedStyle(t, null).getPropertyValue('border-top-width')));

          resize(t);

          if ( t.addEventListener ) {
            t.addEventListener('input', function() { resize(t); });
            t.addEventListener('mouseup', function() { resize(t); }); // set height after user resize
          }

          t['attachEvent'] && t.attachEvent('onkeyup', function() { resize(t); });
        }
      };
  
  // IE7 support
  if ( !document.querySelectorAll ) {
  
    function getElementsByClass(searchClass,node,tag) {
      var classElements = new Array();
      node = node || document;
      tag = tag || '*';
      var els = node.getElementsByTagName(tag);
      var elsLen = els.length;
      var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
      for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
          classElements[j] = els[i];
          j++;
        }
      }
      return classElements;
    }
    
    textareas = getElementsByClass('expanding');
  }
  
  for (var i = 0; i < textareas.length; i++ ) {
    attachResize(textareas[i]);
  }
})();

$('#send-icon').click(function(){
    $(".contact-sub-wrapper").addClass('animated-contact-sub-wrapper').promise().done(function(){
        $(".contact-sub-wrapper").css({display:'none'});
    });
    $('.res-saved').addClass('res-animated')
    // setTimeout(function(){
    //     $(".contact-sub-wrapper").css({display:'none'});
    //     $(".res-saved").css({dispaly:'flex'});
    // },500)
});
