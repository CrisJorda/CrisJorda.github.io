## Research

### Curve2Melody: Sketch-Guided Melody Generation

**Cristina Jordà i Custal**, Tejaswinee Kelkar, Stefano Fasciani

*Sound and Music Computing*, 2026

**Abstract**
In this paper, we present Curve2Melody, a multimodal AI generative system that enables the creation of new melodies based on a melodic context and a hand-drawn sketch. Our work builds upon sketch-based melodic generative models, specifically the inpainting system ``Draw and Listen'', optimizing its architecture by utilizing a simplified input data structure and conditioning the model on a single context measure. We introduce a novel methodology for representing melodic contours using spline curves, encoding them through their derivatives to extract relevant features. The model employs a variational autoencoder with two encoders and three decoders, predicting pitch range, rhythm, and key from the context measure, while pitch is generated from the input sketch. To evaluate the performance, we design three experiments using the same pitch-, rhythm-, and context-matching metrics as in the baseline. Results show that our approach improves contour and rhythm matching while achieving tonal consistency, outperforming the baseline model on the same dataset using a smaller model with more than thirty times fewer trainable parameters.

**Keywords**: Sketch-Based Melody Generation, Melodic Contour, Spline Curves, Variational Autoencoder

*To be published in November 2026*

---

### Analyzing music improvisations using unsupervised machine learning: Towards automatically discovering creative cognition principles

**Cristina Jordà i Custal**

*Master's thesis*, Universitat Politècnica de Catalunya (UPC, Spain), in collaboration with Kungliga Tekniska Högskolan (KTH, Stockholm)
Published in 2024

**Abstract**  
In the field of musical expression, the complex relationship between improvisation and the cognitive processes that underlie creativity presents a fascinating yet challenging puzzle, prompting this thesis to explore the connection between musical improvisation and creative cognition among musicians. Focusing on the development of robust methods for feature extraction and representation, it utilizes unsupervised Machine Learning (ML) techniques to project improvisations from a prime melody into a high-level latent space. The methodology involves iterative analysis employing Variational Autoencoder (VAE) models, initially pre-trained with a larger dataset and fine-tuned with a musical improvisation dataset provided by the MaxPlank Institute. Evaluation encompasses the Evidence Lower Bound (ELBO) loss metric and dimensionality reduction techniques like Principal Component Analysis (PCA), t-distributed Stochastic Neighbor Embedding (t-SNE), Multidimensional Scaling (MDS), and Uniform Manifold Approximation and Projection (UMAP) to explore latent space representations. The results reveal that experienced musicians exhibit greater divergence from the prime melody compared to amateurs. Moreover, professionals’ samples demonstrate more refined clustering and nuanced adjustments between improvisations projected in the latent space.

**Keywords**: Music Improvisation, Unsupervised Machine Learning, Creative Cognition

[Read the publication](https://upcommons.upc.edu/entities/publication/33ae9227-f95b-4ecd-b8df-f7de668fb811)
