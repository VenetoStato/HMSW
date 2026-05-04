'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { getLocaleClient } from '@/lib/localeClient';
import { FancyButton } from '@/components/FancyButton';
import { fireGoogleAdsConversion } from '@/lib/googleAds';

function cls(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ');
}

type Copy = {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  cta: string;
  sending: string;
  sentTitle: string;
  sentBody: string;
  sentLink: string;
  error: string;
};

const COPY: Record<Locale, Copy> = {
  it: {
    title: 'Guida alla robotica base (gratis)',
    subtitle:
      'Ricevi una guida pratica: come impostare i primi componenti, i criteri di compatibilità e una checklist per partire più veloce.',
    emailLabel: 'La tua email',
    emailPlaceholder: 'nome@azienda.com',
    cta: 'Invia e ricevi la guida',
    sending: 'Invio…',
    sentTitle: 'Fatto! 🎉',
    sentBody:
      'Abbiamo registrato la tua richiesta. Ora puoi scaricare la guida qui sotto.',
    sentLink: 'Scarica la guida',
    error: 'Email non valida o errore invio: riprova.',
  },
  en: {
    title: 'Basic robotics guide (free)',
    subtitle:
      'Get a practical guide: how to pick your first components, compatibility criteria, and a quick checklist to start faster.',
    emailLabel: 'Your email',
    emailPlaceholder: 'name@company.com',
    cta: 'Send and get the guide',
    sending: 'Sending…',
    sentTitle: 'Done! 🎉',
    sentBody: 'We saved your request. Now download the guide below.',
    sentLink: 'Download the guide',
    error: 'Invalid email or send error: try again.',
  },
  de: {
    title: 'Basis-Robotics-Guide (gratis)',
    subtitle:
      'Erhalte eine praktische Anleitung: Komponenten auswählen, Kompatibilitätskriterien und eine Checkliste für den Start.',
    emailLabel: 'Deine E-Mail',
    emailPlaceholder: 'name@firma.de',
    cta: 'Senden und Guide erhalten',
    sending: 'Senden…',
    sentTitle: 'Erledigt! 🎉',
    sentBody: 'Wir haben deine Anfrage gespeichert. Lade die Anleitung unten herunter.',
    sentLink: 'Guide herunterladen',
    error: 'Ungültige E-Mail oder Fehler: bitte erneut versuchen.',
  },
  fr: {
    title: 'Guide robotique de base (gratuit)',
    subtitle:
      'Recevez un guide pratique : comment choisir les premiers composants, critères de compatibilité et checklist.',
    emailLabel: 'Votre email',
    emailPlaceholder: 'nom@entreprise.com',
    cta: 'Envoyer et recevoir le guide',
    sending: 'Envoi…',
    sentTitle: 'C’est fait ! 🎉',
    sentBody:
      'Nous avons enregistré votre demande. Téléchargez le guide ci-dessous.',
    sentLink: 'Télécharger le guide',
    error: "Email invalide ou erreur d'envoi : réessayez.",
  },
  nl: {
    title: 'Basis robotica gids (gratis)',
    subtitle:
      'Ontvang een praktische gids: eerste componenten, compatibiliteitscriteria en checklist om sneller te starten.',
    emailLabel: 'Je e-mail',
    emailPlaceholder: 'naam@bedrijf.nl',
    cta: 'Verstuur en ontvang de gids',
    sending: 'Verzenden…',
    sentTitle: 'Gelukt! 🎉',
    sentBody:
      'We hebben je aanvraag opgeslagen. Download de gids hieronder.',
    sentLink: 'Download de gids',
    error: 'Ongeldig e-mailadres of fout: probeer opnieuw.',
  },
  no: {
    title: 'Grunnleggende robotikk-guide (gratis)',
    subtitle:
      'Få en praktisk guide: hvordan velge første komponenter, kompatibilitetskriterier og en sjekkliste.',
    emailLabel: 'Din e-post',
    emailPlaceholder: 'navn@firma.no',
    cta: 'Send og få guiden',
    sending: 'Sender…',
    sentTitle: 'Ferdig! 🎉',
    sentBody:
      'Vi har lagret forespørselen din. Last ned guiden nedenfor.',
    sentLink: 'Last ned guiden',
    error: 'Ugyldig e-post eller feil: prøv igjen.',
  },
  es: {
    title: 'Guía de robótica básica (gratis)',
    subtitle:
      'Recibe una guía práctica: cómo elegir los primeros componentes, criterios de compatibilidad y una checklist.',
    emailLabel: 'Tu email',
    emailPlaceholder: 'nombre@empresa.com',
    cta: 'Enviar y recibir la guía',
    sending: 'Enviando…',
    sentTitle: '¡Listo! 🎉',
    sentBody: 'Guardamos tu solicitud. Ahora descarga la guía abajo.',
    sentLink: 'Descargar la guía',
    error: 'Email inválido o error: inténtalo de nuevo.',
  },
};

function isEmailOk(email: string) {
  const e = (email ?? '').trim();
  return e.length >= 5 && e.includes('@') && e.includes('.');
}

export function LeadMagnetClient({ locale }: { locale?: Locale }) {
  const uiLocale = useMemo(() => locale ?? getLocaleClient(), [locale]);
  const copy = COPY[uiLocale] ?? COPY.it;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isEmailOk(email)) {
      setStatus('error');
      return;
    }

    try {
      setStatus('sending');
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        setStatus('error');
        return;
      }

      fireGoogleAdsConversion('lead_magnet');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-lg md:text-xl font-bold tracking-tight">{copy.title}</h2>
          <p className="mt-2 text-sm md:text-base text-gray-200/80 leading-relaxed">
            {copy.subtitle}
          </p>
        </div>
      </div>

      {status !== 'sent' ? (
        <form onSubmit={onSubmit} className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] items-start">
          <label className="block">
            <span className="block text-xs font-medium text-gray-200/80">{copy.emailLabel}</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.emailPlaceholder}
              className={cls(
                'mt-1 w-full rounded-xl border bg-white/5 border-white/10',
                'px-3 py-2 text-sm outline-none',
                'focus-visible:ring-2 focus-visible:ring-white/20'
              )}
            />
          </label>
          <div className="pt-5 sm:pt-0">
            <FancyButton type="submit" disabled={status === 'sending'} variant="primary" className="w-full sm:w-auto">
              {status === 'sending' ? copy.sending : copy.cta}
            </FancyButton>
          </div>

          {status === 'error' ? (
            <div className="sm:col-span-2 text-sm text-red-300/90">
              {copy.error}
            </div>
          ) : null}
        </form>
      ) : (
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-sm font-semibold">{copy.sentTitle}</div>
          <div className="mt-2 text-sm text-gray-200/80 leading-relaxed">{copy.sentBody}</div>
          <div className="mt-4">
            <a
              href="/guida-robotica-base"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition"
            >
              {copy.sentLink}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
