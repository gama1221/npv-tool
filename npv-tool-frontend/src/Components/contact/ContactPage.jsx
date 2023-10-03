const ContactPage = () => {
  const handleContact = (e) => {
    e.preventDefault();
    alert("redirect to email for sending");
  };
  return (
    <div className="p-4">
      <form
        onSubmit={handleContact}
        class="max-w-md mx-auto p-4 bg-white shadow-md rounded-md m-4"
      >
        <div class="mb-4">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            required
            id="name"
            name="name"
            class="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div class="mb-4">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            required
            id="email"
            name="email"
            class="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div class="mb-4">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            required
            id="message"
            name="message"
            rows="4"
            class="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
          ></textarea>
        </div>
        <button
          type="submit"
          class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Submit
        </button>
        {/* <h1>
          <p>Radical: &#x221A; or &#8730;</p>
          <p>Radical: &#x221A;(x + y)</p>
        </h1> */}
        {/* Contact page */}
      </form>
    </div>
  );
};
export default ContactPage;
