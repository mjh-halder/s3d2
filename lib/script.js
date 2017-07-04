/**
 * TransmitLicense
 * @param {org.acme.printingNetwork.LicenseTransmission} licenseTransmission - the object to transmit a license
 * @transaction
 */
function transmitLicense(licenseTransmission) {
    licenseTransmission.printing_license.owner = licenseTransmission.new_owner;
    return getAssetRegistry('org.acme.printingNetwork.PrintingLicense')
      .then(function (assetRegistry) {
          return assetRegistry.update(licenseTransmission.printing_license);
      });
}

/**
 * CreateLicense
 * @param {org.acme.printingNetwork.LicenseCreation} licenseCreation - the object to create a license
 * @transaction
 */
function createLicense(newLicense) {
      return getAssetRegistry('org.acme.printingNetwork.PrintingLicense')
      .then(function (assetRegistry) {
          return assetRegistry.add(newLicense);
      });
}

/**
 * CreateLicense
 * @param {org.acme.printingNetwork.LicenseUtilisation} LicenseUtilisation - the object to utilize a license
 * @transaction
 */
function utilizeLicense(licenseUtilisation) {
      return getAssetRegistry('org.acme.printingNetwork.PrintingLicense')
      .then(function (assetRegistry) {
          return assetRegistry.get(licenseUtilisation.printing_license.print_license_id);
      })
      .then(function (printLicense){
          printLicense.amount = printLicense.amount - 1;
          return assetRegistry.update(printLicense);
      });
}
