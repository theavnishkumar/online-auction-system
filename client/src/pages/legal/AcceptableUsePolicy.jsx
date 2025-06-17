import { Link } from "react-router";

export default function AcceptableUsePolicy() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 pl-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Acceptable Use Policy
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Purpose
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Acceptable Use Policy outlines the permitted and prohibited
              uses of our online auction platform to ensure a safe and fair
              environment for all users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Permitted Uses
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                Buying and selling legitimate items through our auction system
              </li>
              <li>Creating accurate listings with honest descriptions</li>
              <li>Communicating with other users for transaction purposes</li>
              <li>Using our platform features as intended</li>
              <li>
                Providing feedback and reviews based on actual experiences
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Prohibited Items
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Illegal drugs, weapons, or controlled substances</li>
              <li>Stolen or counterfeit goods</li>
              <li>Adult content or services</li>
              <li>Live animals or animal parts from endangered species</li>
              <li>Hazardous materials or chemicals</li>
              <li>Items that infringe intellectual property rights</li>
              <li>Government-issued documents or currency</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Prohibited Activities
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Attempting to hack, disrupt, or damage our systems</li>
              <li>Using automated tools to manipulate auctions</li>
              <li>Creating multiple accounts to circumvent restrictions</li>
              <li>Engaging in money laundering or fraud</li>
              <li>Collecting user information for unauthorized purposes</li>
              <li>Interfering with other users' ability to use the platform</li>
              <li>Reverse engineering or copying our software</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Content Guidelines
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All content must be appropriate and family-friendly</li>
              <li>Images must accurately represent the item being sold</li>
              <li>Descriptions must be truthful and complete</li>
              <li>No misleading or false advertising</li>
              <li>Respect copyright and trademark laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Security Requirements
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Keep your account credentials secure</li>
              <li>Do not share your account with others</li>
              <li>Report suspicious activity immediately</li>
              <li>Use strong, unique passwords</li>
              <li>Enable two-factor authentication when available</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Enforcement
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to investigate violations of this policy and
              take appropriate action, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Removing content or listings</li>
              <li>Suspending or terminating accounts</li>
              <li>Reporting illegal activities to authorities</li>
              <li>Taking legal action when necessary</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Acceptable Use Policy or need to
              report a violation, please contact us using <Link to={"/contact"} className="text-blue-600">contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
