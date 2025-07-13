import React from 'react';
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h1>Privacy & Payment Data Use Policy</h1>
      <p><strong>Effective Date:</strong> 7/13/2025<br />
         <strong>Last Updated:</strong> 7/13/2025</p>

      <section>
        <h2>1. Purpose</h2>
        <p>This policy describes how the App accesses, handles, and displays limited customer payment data — specifically, <strong>cardholder name</strong> and the <strong>last four digits of the credit card number</strong> — in compliance with the <strong>Payment Card Industry Data Security Standard (PCI DSS)</strong>.</p>
      </section>

      <section>
        <h2>2. What Data We Access</h2>
        <ul>
          <li>Cardholder name</li>
          <li>Last 4 digits of the credit or debit card</li>
          <li>Order metadata (e.g., total, date, status)</li>
        </ul>
        <p><strong>We do not collect, store, or display:</strong></p>
        <ul>
          <li>Full credit card numbers</li>
          <li>CVV / CVV2 codes</li>
          <li>Full billing information</li>
          <li>Any sensitive authentication data</li>
        </ul>
      </section>

      <section>
        <h2>3. How the Data Is Used</h2>
        <ul>
          <li>Verifying legitimate customer purchases</li>
          <li>Helping business owners review or track orders</li>
        </ul>
        <p>All access is restricted to <strong>authorized users</strong> (e.g., owners or appointed staff) of the business operating the store.</p>
      </section>

      <section>
        <h2>4. How the Data Is Protected</h2>
        <ul>
          <li>Encrypted connections (HTTPS/TLS 1.2+) for all API and internal data transmission</li>
          <li>No local or server-side storage of credit card data — even masked data like last 4 digits</li>
          <li>Role-based access control to ensure only authorized users can view payment information</li>
          <li>Session-based authentication with secure password storage</li>
          <li>No logging of sensitive card-related information</li>
        </ul>
      </section>

      <section>
        <h2>5. User Responsibilities</h2>
        <ul>
          <li>Keep login credentials confidential</li>
          <li>Not share access with unauthorized users</li>
          <li>Avoid downloading or storing customer payment data outside the App</li>
          <li>Report any unauthorized access or security concerns immediately</li>
        </ul>
      </section>

      <section>
        <h2>6. Compliance with PCI DSS</h2>
        <ul>
          <li>Data minimization (only required data is accessed)</li>
          <li>Restricted access</li>
          <li>No storage of sensitive authentication data</li>
          <li>Encrypted transmission of all data</li>
        </ul>
      </section>

      <section>
        <h2>7. Data Sharing and Third Parties</h2>
        <p>We do not share any customer payment data with third parties. All data comes directly from Authorize.Net, a PCI DSS–certified payment processor.</p>
      </section>

      <section>
        <h2>8. Policy Updates</h2>
        <p>This policy may be updated from time to time to reflect changes in compliance requirements or technology. Users will be notified of material changes.</p>
      </section>

      <section>
        <h2>9. Contact</h2>
        <p>For questions or concerns about this policy, please contact:<br />
          <strong>Gegi</strong><br />
          <strong>Email:</strong> gegi1911@gmail.com<br />
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
