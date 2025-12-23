import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const HeartAnimation = ({ delay }) => {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      animValue.setValue(0);
      Animated.timing(animValue, {
        toValue: 1,
        duration: 4000,
        delay: delay,
        useNativeDriver: true,
      }).start(() => animate());
    };
    animate();
  }, []);

  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height, -100],
  });

  const opacity = animValue.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [0, 1, 1, 0],
  });

  return (
    <Animated.View
      style={[
        styles.heart,
        {
          left: Math.random() * width,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Text style={styles.heartEmoji}>❤️</Text>
    </Animated.View>
  );
};

const ConfettiPiece = ({ delay }) => {
  const animValue = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      animValue.setValue(0);
      rotation.setValue(0);
      Animated.parallel([
        Animated.timing(animValue, {
          toValue: 1,
          duration: 3000,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 1,
          duration: 3000,
          delay: delay,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, []);

  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, height],
  });

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const colors = ['#FFD700', '#FF69B4', '#00CED1', '#FF1493', '#7B68EE'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Animated.View
      style={[
        styles.confetti,
        {
          left: Math.random() * width,
          backgroundColor: color,
          transform: [{ translateY }, { rotate }],
        },
      ]}
    />
  );
};

const BirthdayApp = () => {
  const [page, setPage] = useState('home');
  const [currentReason, setCurrentReason] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const reasons = [
    "Du bist immer für mich da", "Dein Lächeln erhellt jeden Tag", "Du verstehst mich wie niemand sonst",
    "Deine Umarmungen sind die besten", "Du kochst das leckerste Essen", "Du glaubst immer an mich",
    "Deine Weisheit hilft mir in allen Lebenslagen", "Du bist so stark und mutig", "Dein Humor ist einzigartig",
    "Du gibst die besten Ratschläge", "Du bist mein größtes Vorbild", "Deine Liebe ist bedingungslos",
    "Du machst unser Haus zu einem Zuhause", "Du opferst so viel für uns", "Deine Geduld ist bewundernswert",
    "Du feierst jeden meiner Erfolge", "Du tröstest mich in schweren Zeiten", "Deine Kreativität inspiriert mich",
    "Du lehrst mich wichtige Werte", "Dein Optimismus ist ansteckend", "Du bist immer ehrlich zu mir",
    "Deine Geschichten sind legendär", "Du erinnerst dich an alle wichtigen Daten", "Deine Fürsorge kennt keine Grenzen",
    "Du machst aus gewöhnlichen Tagen etwas Besonderes", "Dein Mut ermutigt mich", "Du siehst das Beste in mir",
    "Deine Stimme beruhigt mich", "Du bist meine beste Freundin", "Dein Lachen ist ansteckend",
    "Du schaffst immer Zeit für mich", "Deine Ratschläge sind Gold wert", "Du bist so selbstlos",
    "Deine Stärke beeindruckt mich", "Du machst die Welt zu einem besseren Ort", "Dein Herz ist riesig",
    "Du verstehst meine Träume", "Deine Unterstützung bedeutet mir alles", "Du bist so talentiert",
    "Dein Einfühlungsvermögen ist außergewöhnlich", "Du machst mich zu einem besseren Menschen",
    "Deine Energie ist mitreißend", "Du zeigst mir, was wahre Liebe ist", "Dein Fleiß ist vorbildlich",
    "Du bist so verlässlich", "Deine Umarmungen heilen alles", "Du feierst auch kleine Erfolge mit mir",
    "Dein positiver Einfluss ist unbezahlbar", "Du lehrst mich Dankbarkeit", "Deine Sanftheit berührt mich",
    "Du bist immer authentisch", "Dein Vertrauen ehrt mich", "Du machst selbst Alltägliches magisch",
    "Deine Weisheit leitet mich", "Du bist meine Heldin", "Dein Mitgefühl kennt keine Grenzen",
    "Du inspirierst mich täglich", "Deine Liebe gibt mir Kraft", "Du bist einzigartig und wundervoll",
    "Dein Lächeln zaubert mir ein Lächeln ins Gesicht", "Du bist mein sicherer Hafen",
    "Deine Güte berührt jeden", "Du bist so großzügig", "Dein Charme ist unwiderstehlich",
    "Du machst mich stolz", "Deine Präsenz ist ein Geschenk", "Du bist mein Sonnenschein",
    "Dein Verständnis tröstet mich", "Du bist so weise", "Deine Liebe formt mich",
    "Du bist mein Fels in der Brandung", "Dein Humor rettet schlechte Tage", "Du bist meine Inspiration",
    "Deine Hingabe ist bewundernswert", "Du bist mein größter Fan", "Dein Mut macht mir Mut",
    "Du bist so liebevoll", "Deine Zärtlichkeit heilt Wunden", "Du bist mein Glücksbringer",
    "Dein Wesen ist herzerwärmend", "Du bist einfach perfekt, so wie du bist",
    "Deine Liebe ist das größte Geschenk", "Du bist die beste Mama der Welt",
    "Danke, dass es dich gibt", "Du bedeutest mir mehr als Worte sagen können",
    "Dein Herz ist aus Gold", "Du bist mein Ein und Alles", "Deine Liebe trägt mich durchs Leben",
    "Du bist meine größte Bereicherung", "Dein Dasein ist ein Segen", "Du bist einfach unglaublich",
    "Deine Liebe macht alles möglich", "Du bist mein Anker", "Dein Licht erhellt mein Leben",
    "Du bist unersetzlich", "Deine Nähe gibt mir Geborgenheit", "Du bist mein Lieblingsmensch",
    "Dein Wesen berührt meine Seele", "Du bist mein größter Schatz", "Ich liebe dich über alles!"
  ];

  const HomePage = () => (
    <View style={styles.container}>
      {[...Array(10)].map((_, i) => (
        <HeartAnimation key={`heart-${i}`} delay={i * 800} />
      ))}
      {[...Array(15)].map((_, i) => (
        <ConfettiPiece key={`confetti-${i}`} delay={i * 300} />
      ))}
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.sparkle}>✨</Text>
          <Text style={styles.title}>Alles Gute zum</Text>
          <Text style={styles.titleBig}>Geburtstag, Mama! 🎉</Text>
          <Text style={styles.subtitle}>Für die beste Mama der Welt ❤️</Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPage('reasons')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>❤️</Text>
            <Text style={styles.buttonText}>100 Gründe, warum du die Beste bist</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setPage('gallery')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>📸</Text>
            <Text style={styles.buttonText}>Unsere schönsten Momente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setPage('gift')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>🎁</Text>
            <Text style={styles.buttonText}>Dein besonderes Geschenk</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const ReasonsPage = () => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setPage('home')}
        >
          <Text style={styles.backButtonText}>← Zurück</Text>
        </TouchableOpacity>

        <View style={styles.reasonCard}>
          <Text style={styles.starIcon}>⭐</Text>
          <Text style={styles.reasonNumber}>Grund #{currentReason + 1}</Text>
          <Text style={styles.reasonSubtitle}>von 100 Gründen</Text>

          <View style={styles.reasonTextContainer}>
            <Text style={styles.reasonText}>"{reasons[currentReason]}"</Text>
          </View>

          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[styles.navButton, currentReason === 0 && styles.navButtonDisabled]}
              onPress={() => currentReason > 0 && setCurrentReason(currentReason - 1)}
              disabled={currentReason === 0}
            >
              <Text style={styles.navButtonText}>◄ Vorheriger</Text>
            </TouchableOpacity>

            <View style={styles.dotContainer}>
              {[...Array(10)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    Math.floor(currentReason / 10) === i && styles.dotActive,
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.navButton,
                currentReason === reasons.length - 1 && styles.navButtonDisabled,
              ]}
              onPress={() => currentReason < reasons.length - 1 && setCurrentReason(currentReason + 1)}
              disabled={currentReason === reasons.length - 1}
            >
              <Text style={styles.navButtonText}>Nächster ►</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
  const galleryImages = [
  require('./assets/images/foto1.jpeg'),
  require('./assets/images/foto2.jpeg'),
  require('./assets/images/foto3.jpeg'),
  require('./assets/images/foto4.jpeg'),
  require('./assets/images/foto5.jpeg'),
  require('./assets/images/foto6.jpeg'),
];


  const GalleryPage = () => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setPage('home')}
        >
          <Text style={styles.backButtonText}>← Zurück</Text>
        </TouchableOpacity>

        <View style={styles.galleryCard}>
          <Text style={styles.galleryTitle}>Unsere schönsten Momente 📸</Text>
          
          <View style={styles.gallery}>
  {galleryImages.map((img, index) => (
    <View key={index} style={styles.galleryItem}>
      <Image
        source={img}
        style={styles.galleryImage}
        resizeMode="cover"
      />
            </View>
            ))}
            </View>

        </View>
      </ScrollView>
    </View>
  );

  const GiftPage = () => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setPage('home')}
        >
          <Text style={styles.backButtonText}>← Zurück</Text>
        </TouchableOpacity>

        <View style={styles.giftCard}>
          <Text style={styles.giftIcon}>🎁</Text>
          <Text style={styles.giftTitle}>Dein besonderes Geschenk</Text>

          <View style={styles.giftContent}>
            <Text style={styles.giftMainText}>
              Ein ganzes Jahr voller besonderer Momente!
            </Text>
            
            <Text style={styles.giftText}>
              Jeden Monat ein besonderer Tag nur für uns zwei - ob ein gemeinsames Essen,
              ein Ausflug oder einfach nur Zeit zusammen.
            </Text>

            <View style={styles.giftHighlight}>
              <Text style={styles.giftHighlightTitle}>
                12 Gutscheine für unvergessliche Erinnerungen ❤️
              </Text>
              <Text style={styles.giftHighlightText}>
                Weil Zeit mit dir das wertvollste Geschenk ist!
              </Text>
            </View>

            <Text style={styles.giftLove}>Ich liebe dich, Mama! 💕</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <LinearGradient
      colors={['#ec4899', '#a855f7', '#6366f1']}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" />
      {page === 'home' && <HomePage />}
      {page === 'reasons' && <ReasonsPage />}
      {page === 'gallery' && <GalleryPage />}
      {page === 'gift' && <GiftPage />}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sparkle: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  titleBig: {
    fontSize: 52,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    gap: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c3aed',
    textAlign: 'center',
  },
  heart: {
    position: 'absolute',
    zIndex: -1,
  },
  heartEmoji: {
    fontSize: 24,
  },
  confetti: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 2,
    zIndex: -1,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  reasonCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 50,
    marginBottom: 20,
  },
  reasonNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 5,
  },
  reasonSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  reasonTextContainer: {
    minHeight: 150,
    justifyContent: 'center',
    marginBottom: 30,
  },
  reasonText: {
    fontSize: 26,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
    lineHeight: 38,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  navButton: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dotContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  dotActive: {
    backgroundColor: '#7c3aed',
  },
  galleryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 30,
    padding: 30,
  },
  galleryTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7c3aed',
    textAlign: 'center',
    marginBottom: 30,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'space-between',
  },
  galleryItem: {
    width: (width - 90) / 2,
    aspectRatio: 1,
    backgroundColor: '#f3e8ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  cameraIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  galleryText: {
    color: '#7c3aed',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 5,
  },
  gallerySubtext: {
    color: '#a78bfa',
    fontSize: 11,
    textAlign: 'center',
  },
  giftCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  giftIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  giftTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 30,
    textAlign: 'center',
  },
  giftContent: {
    gap: 20,
  },
  giftMainText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#7c3aed',
    textAlign: 'center',
  },
  giftText: {
    fontSize: 18,
    color: '#4b5563',
    lineHeight: 28,
    textAlign: 'center',
  },
  giftHighlight: {
    backgroundColor: '#fce7f3',
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  giftHighlightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#be185d',
    marginBottom: 10,
    textAlign: 'center',
  },
  giftHighlightText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
  },
  giftLove: {
    fontSize: 28,
    marginTop: 20,
    textAlign: 'center',
  },
  galleryItem: {
  width: '48%',
  height: 160,
  borderRadius: 20,
  marginBottom: 12,
  overflow: 'hidden',
},

galleryImage: {
  width: '100%',
  height: '100%',
  borderRadius: 20,
},

});

export default BirthdayApp;