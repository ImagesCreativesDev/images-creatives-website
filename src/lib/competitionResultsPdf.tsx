import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'
import type { CompetitionEntry } from './competitionEntries'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#1f2937',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 24,
  },
  entry: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  rank: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#6b7280',
  },
  score: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#b45309',
  },
  entryTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  photographer: {
    fontSize: 11,
    color: '#4b5563',
    marginBottom: 8,
  },
  image: {
    width: 180,
    height: 120,
    objectFit: 'cover',
    marginBottom: 8,
  },
  commentsLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#6b7280',
    marginBottom: 4,
  },
  comments: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#374151',
  },
})

interface CompetitionResultsPdfDocumentProps {
  monthLabel: string
  entries: CompetitionEntry[]
}

export function CompetitionResultsPdfDocument({
  monthLabel,
  entries,
}: CompetitionResultsPdfDocumentProps) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>Image Creatives Competition Results</Text>
        <Text style={styles.subtitle}>{monthLabel}</Text>

        {entries.map((entry, index) => (
          <View key={entry._id} style={styles.entry} wrap={false}>
            <View style={styles.entryHeader}>
              <Text style={styles.rank}>#{index + 1}</Text>
              <Text style={styles.score}>{entry.score?.toFixed(1) ?? '—'}</Text>
            </View>
            <Text style={styles.entryTitle}>{entry.title}</Text>
            <Text style={styles.photographer}>by {entry.photographer}</Text>
            {entry.imageUrl ? <Image src={entry.imageUrl} style={styles.image} /> : null}
            {entry.description ? (
              <>
                <Text style={styles.commentsLabel}>Judging Comments</Text>
                <Text style={styles.comments}>{entry.description}</Text>
              </>
            ) : null}
          </View>
        ))}
      </Page>
    </Document>
  )
}
