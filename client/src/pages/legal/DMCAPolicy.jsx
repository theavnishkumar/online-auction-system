export default function DMCAPolicy() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 pl-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">DMCA Policy</h1>
          <p className="text-sm text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Digital Millennium Copyright Act
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We respect the intellectual property rights of others and expect
              our users to do the same. We will respond to clear notices of
              alleged copyright infringement that comply with the Digital
              Millennium Copyright Act.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Filing a DMCA Notice
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you believe that content on our platform infringes your
              copyright, please provide our designated agent with the following
              information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                A physical or electronic signature of the copyright owner or
                authorized agent
              </li>
              <li>
                Identification of the copyrighted work claimed to have been
                infringed
              </li>
              <li>
                Identification of the material that is claimed to be infringing
              </li>
              <li>Your contact information (address, phone number, email)</li>
              <li>
                A statement of good faith belief that the use is not authorized
              </li>
              <li>
                A statement that the information is accurate and you are
                authorized to act
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Counter-Notification
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you believe your content was removed in error, you may file a
              counter-notification containing:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Your physical or electronic signature</li>
              <li>Identification of the removed material and its location</li>
              <li>
                A statement under penalty of perjury that removal was a mistake
              </li>
              <li>Your contact information</li>
              <li>Consent to jurisdiction of federal court</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Repeat Infringers
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We will terminate the accounts of users who are repeat infringers
              of intellectual property rights.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
