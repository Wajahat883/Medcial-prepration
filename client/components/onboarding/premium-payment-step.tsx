"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePremiumPackageStore } from "@/store/premium-package-store";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Shield } from "lucide-react";

export function PremiumPaymentStep() {
  const router = useRouter();
  const { selectedPackage, getPackages } = usePremiumPackageStore();
  const onboardingStore = useOnboardingStore();
  const { user, setUser } = useAuthStore();

  // Get university from either user (after trial) or onboarding store (during onboarding)
  const university =
    user?.selectedUniversity || onboardingStore.selectedUniversity;

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [formData, setFormData] = useState({
    cardholderName: user?.firstName ? `${user.firstName} ${user.lastName}` : "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const packages = getPackages();
  const selectedPkg = packages.find((p) => p.id === selectedPackage);

  if (!selectedPackage || !selectedPkg) {
    router.push("/onboarding/premium-packages");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    } else if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Save premium package to user profile via API
      if (user && selectedPkg) {
        const response = await fetch(`/api/users/${user.id}/premium-package`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageId: selectedPackage,
            pastPapers: selectedPkg.pastPapers,
            accessDays: selectedPkg.accessDays,
            dailyHours: selectedPkg.dailyPracticeHours,
            price: selectedPkg.price,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save premium package");
        }

        // Update user in auth store with premium package info
        setUser({
          ...user,
          premiumPackage: selectedPackage,
          premiumPastPapers: selectedPkg.pastPapers,
          premiumAccessDays: selectedPkg.accessDays,
          premiumDailyHours: selectedPkg.dailyPracticeHours,
          premiumPrice: selectedPkg.price,
          onboardingComplete: true,
        });
      }

      router.push("/onboarding/success");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment processing failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-gray-600">
            You're upgrading to{" "}
            <span className="font-semibold text-blue-600">
              {selectedPkg.name}
            </span>{" "}
            for <span className="font-semibold">{university}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card className="p-6">
              {/* Payment Method Selection */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer border-blue-300 bg-blue-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "card" | "paypal")
                      }
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">
                      Credit/Debit Card
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "card" | "paypal")
                      }
                      className="w-4 h-4"
                    />
                    <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
                    <span className="font-semibold text-gray-900">PayPal</span>
                  </label>
                </div>
              </div>

              {/* Card Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Card Details</h3>

                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      disabled={isProcessing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="4532 1234 5678 9010"
                      maxLength={19}
                      disabled={isProcessing}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Test Card: 4532 1234 5678 9010
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        disabled={isProcessing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={3}
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal Message */}
              {paymentMethod === "paypal" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    You will be redirected to PayPal to complete your payment
                    securely.
                  </p>
                </div>
              )}

              {/* Security Info */}
              <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              {/* Package Details */}
              <div className="space-y-3 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Plan</p>
                  <p className="font-semibold text-gray-900">
                    {selectedPkg.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">University</p>
                  <p className="font-semibold text-gray-900">{university}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 uppercase">
                    Includes:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>
                        {selectedPkg.pastPapers === "unlimited"
                          ? "All Past Papers"
                          : `${selectedPkg.pastPapers} Past Papers`}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{selectedPkg.accessDays} Days Access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>
                        {selectedPkg.dailyPracticeHours === 24
                          ? "Unlimited Daily Practice"
                          : `${selectedPkg.dailyPracticeHours} Hours Daily`}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-3 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${selectedPkg.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-gray-900">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${selectedPkg.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Monthly charge</p>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </span>
                ) : (
                  `Pay $${selectedPkg.price.toFixed(2)}`
                )}
              </Button>

              {/* Money Back Guarantee */}
              <p className="text-xs text-gray-600 text-center mt-4">
                30-day money-back guarantee. Cancel anytime.
              </p>
            </Card>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="text-gray-700 border-gray-300 hover:bg-gray-100"
          >
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );
}
