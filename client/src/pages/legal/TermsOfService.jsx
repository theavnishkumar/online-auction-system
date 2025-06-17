export default function TermsOfService() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 pl-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using our online auction platform, you accept and
              agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              User Accounts
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You must be at least 18 years old to create an account</li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account
              </li>
              <li>You agree to provide accurate and complete information</li>
              <li>You are responsible for all activities under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Auction Rules
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All bids are binding and cannot be retracted</li>
              <li>The highest bidder at auction close wins the item</li>
              <li>Payment must be completed within 48 hours of auction end</li>
              <li>Items must be accurately described by sellers</li>
              <li>
                We reserve the right to cancel auctions for policy violations
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Fees and Payments
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our platform charges listing fees and final value fees as outlined
              in our fee schedule. All fees are non-refundable unless otherwise
              specified.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Prohibited Activities
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Listing illegal or prohibited items</li>
              <li>Bid manipulation or shill bidding</li>
              <li>Creating multiple accounts to circumvent restrictions</li>
              <li>Harassment or abusive behavior toward other users</li>
              <li>Attempting to complete transactions outside our platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are not liable for any indirect, incidental, special, or
              consequential damages arising from your use of our platform. Our
              total liability shall not exceed the fees paid by you in the past
              12 months.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Termination
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may terminate or suspend your account at any time for
              violations of these terms or for any other reason at our sole
              discretion.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
