import MerchantForm from "./MerchantForm";
import { MerchantContext } from "../../contexts/MerchantContext";
import { useContext } from "react";

export default function Merchant() {
    const { save } = useContext(MerchantContext);
    return (
        <>
            <MerchantForm onSubmit={
                (values) => save(
                    values.societyName,
                    values.kbis,
                    values.confirmUrl,
                    values.cancelUrl,
                    values.transactionSuccessUrl,
                    values.currency
                )}
            />
        </>
    );
}
