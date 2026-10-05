from transformers import pipeline


class IntentClassifier:

    def __init__(self):
        self.classifier = pipeline(
            "zero-shot-classification",
            model="facebook/bart-large-mnli"
        )

        self.labels = [
            "Billing",
            "Technical Support",
            "Account and Login",
            "Order and Delivery",
            "General Inquiry"
        ]

        self.confidence_threshold = 0.40

    def classify(self, message: str):

        result = self.classifier(
            message,
            candidate_labels=self.labels
        )

        intent = result["labels"][0]
        confidence = result["scores"][0]

        # Store confidence for every intent
        scores = [
            {
                "intent": label,
                "confidence": score
            }
            for label, score in zip(
                result["labels"],
                result["scores"]
            )
        ]

        # Fallback mechanism
        if confidence < self.confidence_threshold:
            return {
                "intent": "Human Agent",
                "confidence": confidence,
                "route": "Human Support",
                "fallback": True,
                "scores": scores
            }

        route_mapping = {
            "Billing": "Billing Support",
            "Technical Support": "Technical Support Team",
            "Account and Login": "Account Support Team",
            "Order and Delivery": "Order Support Team",
            "General Inquiry": "General Customer Support"
        }

        return {
            "intent": intent,
            "confidence": confidence,
            "route": route_mapping[intent],
            "fallback": False,
            "scores": scores
        }


intent_classifier = IntentClassifier()