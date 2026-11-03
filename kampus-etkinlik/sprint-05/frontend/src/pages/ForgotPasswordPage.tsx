import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email.includes("@")) {
            setError("Geçerli bir e-posta girin.");
            setSent(false);
        } else {
            setError("");
            setSent(true);
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
            <h2>Şifremi Unuttum</h2>
            <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '15px' }}>
                    <label>E-posta</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error && <span className="hata-metni">{error}</span>}
                </div>
                <button type="submit" className="btn" style={{ width: '100%' }}>Bağlantı gönder</button>
            </form>
            {sent && <p style={{ color: 'green', marginTop: '10px' }}>Bağlantı {email} adresine gönderildi (demo).</p>}
            <p style={{ marginTop: '15px' }}><Link to="/login">← Girişe dön</Link></p>
        </div>
    );
}