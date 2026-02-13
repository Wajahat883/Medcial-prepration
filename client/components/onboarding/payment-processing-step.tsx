"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAYMENT_METHODS = [
  { id: "stripe", name: "Stripe (Credit/Debit Card)", icon: "💳" },
  { id: "paypal", name: "PayPal", icon: "🅿️" },
];

const PLAN_PRICES: Record<string, { amount: number; currency: string }> = {
  monthly: { amount: 9.99, currency: "USD" },
  quarterly: { amount: 24.99, currency: "USD" },
  yearly: { amount: 79.99, currency: "USD" },
};

export function PaymentProcessingStep() {
  const router = useRouter();
  const {
    selectedPlan,
    setPaymentIntentId,
    setStep,
    setError,
    error,
    isLoading,
    setLoading,
  } = useOnboardingStore();

  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!selectedPlan || selectedPlan === "free") {
    router.push("/onboarding/subscription");
    return null;
  }

  const planPrice = PLAN_PRICES[selectedPlan];
  const planName =
    selectedPlan === "monthly"
      ? "Monthly Plan"
      : selectedPlan === "quarterly"
        ? "Quarterly Plan"
        : "Annual Plan";

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const validateCardData = () => {
    if (!cardData.cardNumber || cardData.cardNumber.length < 13) {
      setError("Please enter a valid card number");
      return false;
    }
    if (!cardData.expiryDate || !cardData.expiryDate.includes("/")) {
      setError("Please enter expiry date in MM/YY format");
      return false;
    }
    if (!cardData.cvv || cardData.cvv.length < 3) {
      setError("Please enter a valid CVV");
      return false;
    }
    if (!cardData.cardholderName) {
      setError("Please enter cardholder name");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    if (paymentMethod === "stripe" && !validateCardData()) {
      return;
    }

    setPaymentProcessing(true);
    setError(null);

    try {
      // TODO: In production, integrate with real payment gateway
      // For now, simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock payment success
      const paymentIntentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setPaymentIntentId(paymentIntentId);

      setPaymentSuccess(true);

      // After 2 seconds, proceed to onboarding completion
      setTimeout(() => {
        setStep(6);
        router.push("/onboarding/success");
      }, 2000);
    } catch (err) {
      setError("Payment failed. Please try again.");
      console.error("Payment error:", err);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleBack = () => {
    router.push("/onboarding/subscription");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Step 5 of 6
            </span>
            <span className="text-sm font-semibold text-blue-600">
              ~3 minutes
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: "83.33%" }}
            ></div>
          </div>
        </div>

        {/* Success State */}
        {paymentSuccess && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-6">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Your payment has been processed successfully. Redirecting to your
              account...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {!paymentSuccess && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Complete Your Payment
            </h1>
            <p className="text-gray-600 mb-6">
              Secure payment processing with encrypted data
            </p>

            {/* Order Summary */}
            <Card className="mb-6 p-4 bg-gray-50 border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold text-gray-900">
                    {planName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-gray-900">
                    ${planPrice.amount.toFixed(2)} {planPrice.currency}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-blue-600 text-lg">
                    ${planPrice.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Payment Method
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((method) => (
                  <Card
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      paymentMethod === method.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{method.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {method.name}
                        </p>
                      </div>
                      {paymentMethod === method.id && (
                        <div className="text-blue-600">✓</div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stripe Card Form */}
            {paymentMethod === "stripe" && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Card Details
                </h3>
                <div className="space-y-4">
                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <Input
                      type="text"
                      name="cardholderName"
                      placeholder="John Doe"
                      value={cardData.cardholderName}
                      onChange={handleCardInputChange}
                      disabled={paymentProcessing}
                      className="w-full"
                    />
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <Input
                      type="text"
                      name="cardNumber"
                      placeholder="4532 1234 5678 9010"
                      value={cardData.cardNumber}
                      onChange={handleCardInputChange}
                      disabled={paymentProcessing}
                      maxLength={19}
                      className="w-full font-mono"
                    />
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={handleCardInputChange}
                        disabled={paymentProcessing}
                        maxLength={5}
                        className="w-full font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <Input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={handleCardInputChange}
                        disabled={paymentProcessing}
                        maxLength={4}
                        className="w-full font-mono"
                      />
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="text-xs text-gray-500 flex items-center space-x-2">
                    <span>🔒</span>
                    <span>
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* PayPal Info */}
            {paymentMethod === "paypal" && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-600">
                  You will be redirected to PayPal to complete your payment
                  securely.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={paymentProcessing}
                className="flex-1 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg"
              >
                BACK
              </Button>
              <Button
                onClick={handlePayment}
                disabled={!paymentMethod || paymentProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                {paymentProcessing ? (
                  <>
                    <span className="animate-spin inline-block mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  `Pay $${planPrice.amount.toFixed(2)}`
                )}
              </Button>
            </div>

            {/* Info Text */}
            <p className="text-xs text-gray-500 text-center mt-4">
              💡 Test Card: 4532 1234 5678 9010 | Any future date | Any 3-digit
              CVV
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
