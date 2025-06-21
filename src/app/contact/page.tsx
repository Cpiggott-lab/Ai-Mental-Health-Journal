export default function ContactPage() {
  //Not functional just looks, set up with formsubmit or other service
  return (
    <div className="bg-amber-50 min-h-screen px-6 py-12 text-amber-800">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">Contact Us</h1>
        <p className="text-lg text-center">
          If you have any questions or concerns, feel free to reach out to us
          using the form below.
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-500 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
