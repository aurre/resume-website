import React, { useState } from 'react';

const Contact = ({ data }) => {
   if (data) {
      var name = data.name;
      var phone = data.phone;
      var email = data.email;
      var message = data.contactmessage;
   };
   const [status, setStatus] = useState("Submit");
   const [error, setError] = useState(false);
   const [success, setSuccess] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("Sending...");
      const { name, email, message } = e.target.elements;
      let details = {
         name: name.value,
         email: email.value,
         message: message.value,
      };
      let response = await fetch("http://localhost:8081/contact", {
         method: "POST",
         headers: {
            "Content-Type": "application/json;charset=utf-8",
         },
         body: JSON.stringify(details),
      });
      setStatus("Submit");
      let result = await response.json();
      (result.status === 'ERROR') ? setError(true) : setSuccess(true);

   };
   return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

               <p className="lead">{message}</p>
            </div>

         </div>

         <div className="row">
            <div className="eight columns">

               <form id="contactForm" name="contactForm" onSubmit={handleSubmit}>
                  <fieldset>
                     <div>
                        <label htmlFor="name">Name <span className="required">*</span></label>
                        <input type="text" id="name" defaultValue="" size="35" name="contactName" required />
                     </div>

                     <div>
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input type="email" id="email" defaultValue="" size="35" name="contactEmail" required />
                     </div>

                     <div>
                        <label htmlFor="message">Message<span className="required">*</span></label>
                        <textarea cols="50" rows="15" id="message" name="contactMessage"></textarea>
                     </div>
                     <div>
                        {error && <div id="message-warning">Something went wrong while sending your message.</div>}
                        {success && <div id="message-success">
                           <i className="fa fa-check"></i>Your message was sent, thank you!<br />
                        </div>}
                        <button type="submit" className="submit">{status}</button>
                        <span id="image-loader">
                           <img alt="" src="images/loader.gif" />
                        </span>
                     </div>
                  </fieldset>
               </form>
            </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

                  <h4>Email and Phone</h4>
                  <p className="address">
                     {name}<br />
                     {email} <br />
                     <span>{phone}</span>
                  </p>
               </div>
            </aside>
         </div>
      </section>
   );
}

export default Contact;
