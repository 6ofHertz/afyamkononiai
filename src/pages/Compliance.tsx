import React from 'react';

const Compliance = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-card rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-primary">Compliance – AfyaMkononi</h1>

      <div className="mb-6 pb-4 border-b border-border">
        <p className="text-foreground">AfyaMkononi is committed to operating in full compliance with all relevant laws and regulations in Kenya, including those related to healthcare, data protection, and consumer rights.</p>
      </div>

      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="text-2xl font-semibold mb-3 text-secondary-foreground">Healthcare Regulations:</h2>
        <p className="text-muted-foreground">We adhere to the guidelines and standards set by the relevant healthcare regulatory bodies in Kenya to ensure the provision of safe and effective teleconsultation services. Our platform is designed to support licensed healthcare professionals in delivering care responsibly.</p>
      </div>

      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="text-2xl font-semibold mb-3 text-secondary-foreground">Data Protection and Privacy:</h2>
        <p className="text-muted-foreground">We comply with the Data Protection Act of Kenya and other applicable data protection laws. Our practices for collecting, processing, storing, and protecting your personal and health information are detailed in our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
      </div>

      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="text-2xl font-semibold mb-3 text-secondary-foreground">Consumer Protection:</h2>
        <p className="text-muted-foreground">We are committed to upholding consumer rights and providing transparent and fair services in accordance with Kenyan consumer protection laws. Our Terms of Service outline the terms of use for our platform.</p>
      </div>

      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="text-2xl font-semibold mb-3 text-secondary-foreground">Professional Licensing and Standards:</h2>
        <p className="text-muted-foreground">All healthcare professionals on the AfyaMkononi platform are required to be appropriately licensed and registered with their respective professional bodies in Kenya. We support their adherence to professional standards and ethical guidelines in the delivery of telehealthcare.</p>
      </div>

      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="text-2xl font-semibold mb-3 text-secondary-foreground">Platform Security:</h2>
        <p className="text-muted-foreground">We maintain robust security measures to protect the integrity and confidentiality of our platform and user data, in line with best practices and regulatory requirements.</p>
      </div>

      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="text-2xl font-semibold mb-3 text-secondary-foreground">Reporting Concerns:</h2>
        <p className="text-muted-foreground">If you have any concerns regarding compliance, patient safety, or ethical practices on our platform, please contact us immediately at [Insert Contact Information Here].</p>
      </div>

      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="text-2xl font-semibold mb-3 text-secondary-foreground">Changes to Compliance Information:</h2>
        <p className="text-muted-foreground">We will update this Compliance page as necessary to reflect any changes in relevant laws or our operational practices.</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3 text-secondary-foreground">Contact Information:</h2>
        <p className="text-muted-foreground">For any questions about our compliance practices, please contact us at [Insert Contact Information Here].</p>
      </div>
    </div>
  );
};

export default Compliance;
