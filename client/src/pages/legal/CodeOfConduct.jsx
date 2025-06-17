export default function CodeOfConduct() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 pl-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Code of Conduct
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Our Commitment
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to providing a welcoming, safe, and inclusive
              environment for all users of our auction platform, regardless of
              background, identity, or experience level.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Expected Behavior
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Be respectful and courteous to all users</li>
              <li>Communicate professionally in all interactions</li>
              <li>Provide accurate descriptions of items for sale</li>
              <li>Honor your commitments as both buyer and seller</li>
              <li>Respect others' privacy and personal information</li>
              <li>Follow all platform rules and guidelines</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Unacceptable Behavior
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Harassment, intimidation, or discrimination</li>
              <li>Hate speech or offensive language</li>
              <li>Fraudulent or deceptive practices</li>
              <li>Spam or unsolicited promotional content</li>
              <li>Sharing personal information without consent</li>
              <li>Attempting to manipulate auction outcomes</li>
              <li>Creating fake accounts or impersonating others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Reporting Violations
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you witness or experience behavior that violates this code of
              conduct, please report it immediately through our reporting system
              or by contacting support@yourauction.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Consequences
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Violations of this code of conduct may result in:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Warning or temporary suspension</li>
              <li>Removal of content or listings</li>
              <li>Permanent account termination</li>
              <li>Legal action if applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Appeals Process
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you believe you have been unfairly penalized, you may appeal
              the decision by contacting using contact page with details of your
              case.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
